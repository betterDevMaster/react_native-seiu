const functions = require('firebase-functions');
const admin = require('firebase-admin');
const CryptoJS = require('crypto-js');

admin.initializeApp(functions.config().firebase);

exports.sendNewMessageNotification = functions.database
  .ref('/chats/{roomId}/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const message = snapshot.val();
    const {senderId, text} = message;
    const {roomId} = context.params;

    const roomUsersIdsSnap = await admin.database()
      .ref(`chats/${roomId}/users`)
      .once('value');

    const roomUsersIds = [];
    roomUsersIdsSnap.forEach(childSnap => {
      const item = childSnap.val();
      roomUsersIds.push(item);
    });

    const senderSnap = await admin.firestore()
      .doc(`users/${senderId}`)
      .get()
    const sender = senderSnap.data();

    const receiverId = roomUsersIds.find(userId => userId !== senderId);
    const receiverSnap = await admin.firestore()
      .doc(`users/${receiverId}`)
      .get()
    const receiver = receiverSnap.data();

    const payload = {
      notification: {
        title: `${sender.firstName} ${sender.lastName}`,
        body: `${CryptoJS.AES.decrypt(text, functions.config().encrypt.secret).toString(CryptoJS.enc.Utf8)}`,
      }
    };

    return admin.messaging().sendToDevice(receiver.fcmToken, payload);
  });

exports.deleteUser = functions.firestore
  .document('users/{userId}')
  .onDelete(async (snap, context) => {
    const uid = context.params.userId;
    const deletedUser = snap.data();

    //delete user
    try {
      await admin.auth().deleteUser(uid)
    } catch (error) {
      console.log('Error deleting user:', error);
    }

    //delete event if user is creator
    try {
      await admin
        .firestore()
        .collection('events')
        .where('userId', '==', uid)
        .get()
        .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.delete()));
    } catch (error) {
      console.log('Error deleting events:', error);
    }

    //delete user from event invited users
    try {
      await admin
        .firestore()
        .collection('events')
        .where('userIds', 'array-contains', uid)
        .get()
        .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.update({
          userIds: admin.firestore.FieldValue.arrayRemove(uid),
        })));
    } catch (error) {
      console.log('Error deleting from events invited users:', error);
    }

    //delete chats ids from users
    try {
      if (deletedUser.chats && Array.isArray(deletedUser.chats) && deletedUser.chats.length > 0) {
        const promises = deletedUser.chats.map(async chatId => {
          return await admin
            .firestore()
            .collection('users')
            .where('chats', 'array-contains', chatId)
            .get()
            .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.update({
              chats: admin.firestore.FieldValue.arrayRemove(chatId),
            })));
        });
        await Promise.all(promises);
      }
    } catch (error) {
      console.log('Error deleting chats ids from users:', error);
    }

    //delete chats from realtime db
    try {
      if (deletedUser.chats && Array.isArray(deletedUser.chats) && deletedUser.chats.length > 0) {
        const promises = deletedUser.chats.map(async chatId => {
          return await admin
            .database()
            .ref()
            .child(`chats/${chatId}`)
            .remove()
        })
        await Promise.all(promises)
      }
    } catch (error) {
      console.log('Error deleting chats from db:', error);
    }

    //delete forums topics
    try {
      const forumIds = [];

      await admin
        .firestore()
        .collection('forum')
        .get()
        .then(querySnapshot => querySnapshot.forEach(async doc => {
          forumIds.push(doc.id)
          const snapshotTopics = await doc
            .ref
            .collection('topics')
            .where('authorId', '==', uid)
            .get()

          await doc.ref.update({
            topicCount: admin.firestore.FieldValue.increment(-snapshotTopics.size),
          })
        }));

      const promisesTopics = forumIds.map(async id => {
        return await admin
          .firestore()
          .collection('forum')
          .doc(id)
          .collection('topics')
          .where('authorId', '==', uid)
          .get()
          .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.delete()));
      });
      await Promise.all(promisesTopics)
    } catch (error) {
      console.log('Error deleting forum topics:', error);
    }

    //delete forums topics threads
    try {
      const forumIds = [];

      await admin
        .firestore()
        .collection('forum')
        .get()
        .then(querySnapshot => querySnapshot.forEach(doc => forumIds.push(doc.id)));

      forumIds.map(async forumId => {
        const topicIds = [];

        await admin
          .firestore()
          .collection('forum')
          .doc(forumId)
          .collection('topics')
          .get()
          .then(querySnapshot => querySnapshot.forEach(async doc => {
            topicIds.push(doc.id);
            const snapshotThreads = await doc
              .ref
              .collection('threads')
              .where('authorId', '==', uid)
              .get()

            await doc.ref.update({
              replyCount: admin.firestore.FieldValue.increment(-snapshotThreads.size),
            })
          }));

        const promisesThreads = topicIds.map(async topicId => {
          return await admin
            .firestore()
            .collection('forum')
            .doc(forumId)
            .collection('topics')
            .doc(topicId)
            .collection('threads')
            .where('authorId', '==', uid)
            .get()
            .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.delete()));
        });
        await Promise.all(promisesThreads)
      });
    } catch (error) {
      console.log('Error deleting forum topics threads:', error);
    }

    //delete user from forum private topics users list
    try {
      const forumIds = [];

      await admin
        .firestore()
        .collection('forum')
        .get()
        .then(querySnapshot => querySnapshot
          .forEach(async doc => forumIds.push(doc.id)
          )
        );

      const promisesTopics = forumIds.map(async id => {
        return await admin
          .firestore()
          .collection('forum')
          .doc(id)
          .collection('topics')
          .where('type', '==', 'private')
          .where('users', 'array-contains', uid)
          .get()
          .then(querySnapshot => querySnapshot.forEach(doc => doc.ref.update({
            users: admin.firestore.FieldValue.arrayRemove(uid),
          })));
      });
      await Promise.all(promisesTopics)
    } catch (error) {
      console.log('Error deleting user from forum private topics users list:', error);
    }

    //send data message to deleted user
    const payload = {
      data: {
        action: 'logout'
      }
    };
    return admin.messaging().sendToDevice(deletedUser.fcmToken, payload);
  });