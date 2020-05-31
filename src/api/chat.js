import firebase from 'react-native-firebase';

class ChatAPI {
  uid = '';
  messagesRef = null;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
        this.setDbRef();
        this.setCurrentUser();
      }
    });
  }

  // This is a function used for Development
  // When there are too many chats or broken chats etc I run this :))
  async deleteAllChats() {
    let usersIds = [];
    await firebase
      .firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          usersIds.push(doc.id);
        });
      });

    usersIds.forEach(async id => {
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(id);

      userRef.update({
        chats: firebase.firestore.FieldValue.delete(),
      });
    });

    await this.dbRef.remove();
  }

  async deleteSingleChat (chat, chatRoomRef) {
    try {
      await chatRoomRef.remove();
      const promises = chat.users.map(user => {
        return firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            chats: firebase.firestore.FieldValue.arrayRemove(chat.id),
          });
      })

      return Promise.all(promises);
    } catch (e) {
      console.log(e)
    }
  }

  snapshotToArray(snapshot) {
    const returnArr = [];

    snapshot.forEach(childSnapshot => {
      const item = childSnapshot.val();
      item.id = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  }

  setDbRef() {
    this.dbRef = firebase.database().ref();
  }

  setCurrentUser() {
    this.currentUser = firebase.auth().currentUser;
  }

  setUid(value) {
    this.uid = value;
  }

  getUid() {
    return this.uid;
  }

  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }

  signOutFirebase() {
    return firebase.auth().signOut();
  }

  sendPasswordResetEmail(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // Get an array of chats for user
  getUserChatsIds = userId =>
    new Promise(async resolve => {
      const chatsSnapshots = await firebase
        .firestore()
        .collection('users')
        .doc(userId);
      chatsSnapshots.get().then(doc => {
        let chats = [];
        if (doc.exists) {
          chats = doc.data().chats;
        }
        resolve(chats);
      });
    });

  // Get a user
  getUser = userId =>
    new Promise(async resolve => {
      const chatsSnapshots = await firebase
        .firestore()
        .collection('users')
        .doc(userId);
      chatsSnapshots.get().then(doc => {
        let user = {};
        if (doc.exists) {
          user = doc.data();
          user.uid = userId;
        }
        resolve(user);
      });
    });

  // Get information about each room id in a list
  getChatsByIds = async roomIds =>
    Promise.all(
      roomIds.map(async roomId => {
        // Get the user ids of all the users in the current room in the loop

        const roomUserIds = await this.getRoomUserIds(roomId);

        // Get detailed information about each user by their id
        const user1 = await this.getUser(roomUserIds[0]);
        const user2 = await this.getUser(roomUserIds[1]);
        const messages = await this.getRoomMessages(roomId);

        const users = [user1, user2];
        return {id: roomId, users, messages};
      }),
    );

  // Get the user ids for the users in a specified room
  getRoomUserIds = async roomId => {
    const roomUserIdsSnap = await this.dbRef
      .child(`chats/${roomId}/users`)
      .once('value');
    const returnArr = [];
    roomUserIdsSnap.forEach(childSnapshot => {
      const item = childSnapshot.val();
      returnArr.push(item);
    });
    return returnArr;
  };

  // Get messages array for room
  getRoomMessages = async roomId => {
    const roomUserIdsSnap = await this.dbRef
      .child(`chats/${roomId}/messages`)
      .once('value');
    const returnArr = [];
    roomUserIdsSnap.forEach(childSnapshot => {
      const item = childSnapshot.val();
      returnArr.push(item);
    });
    return returnArr;
  };

  // Get detailed information about each user id in a list
  //   getUsersByIds = async userIds =>
  //     Promise.all(
  //       userIds.map(async userId => {
  //         const chatsSnapshots = await firebase
  //           .firestore()
  //           .collection('users')
  //           .doc(userId);

  //         let user;
  //         chatsSnapshots.get().then(doc => {
  //           if (doc.exists) {
  //             user = doc.data();
  //           }
  //         });

  //         return {
  //           name: user.name,
  //           email: user.email,
  //           id: userId,
  //         };
  //       }),
  //     );

  // Unread messages stuff
  setOrIncrementUnreadMessageCount = ({roomId, userId, isCountBeingReset}) => {
    const userUnreadMessagesRef = this.dbRef.child(
      `unreadMessagesCount/${roomId}/${userId}`,
    );
    userUnreadMessagesRef.transaction(currentCount =>
      isCountBeingReset ? 0 : (currentCount || 0) + 1,
    );
  };
}

export default new ChatAPI();
