import firebase from 'react-native-firebase';

export const getEvents = () => {
  return firebase
    .firestore()
    .collection('events')
    .where('date', '>=', new Date().toISOString())
    .orderBy('date', 'asc')
    .get()
    .then(response => {
      let allEvents = [];
      response.docs.forEach(item => {
        let event = item.data();
        event.id = item.id;
        allEvents.push(event);
      });
      return allEvents;
    });
};

export const markAsInterested = event => {
  return firebase
    .firestore()
    .doc(`events/${event.id}`)
    .set({...event}, {merge: true});
};

export const addEvent = event => {
  return firebase
    .firestore()
    .collection('events')
    .add(event);
};

export const uploadImage = (uid, uri) => {
  const imageRef = firebase
    .storage()
    .ref('events')
    .child(uid);

  return imageRef
    .putFile(uri)
    .then(() => {
      return imageRef.getDownloadURL();
    })
    .then(url => {
      return firebase
        .firestore()
        .doc(`events/${uid}`)
        .update({imageHeader: {src: url}});
    });
};
