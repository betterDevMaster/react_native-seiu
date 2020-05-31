import firebase from 'react-native-firebase';

let userId = '';

export const getUserId = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userId = user.uid;
    } else {
      return null;
    }
  });
};

export const getUserChats = async () => {
  await getUserId();
  return firebase
    .firestore()
    .collection('chats')
    .where('usersIds', 'array-contains', userId)
    .get()
    .then(response => {
      let chats = [];
      response.docs.forEach(item => {
        let chat = item.data();
        chats.push(chat);
      });
      return chats;
    });
};
