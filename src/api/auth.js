import firebase from 'react-native-firebase';

export const addUser = (email, password, firstName, lastname, union = {}) => {
  var uid;
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      uid = res.user.uid;
      return firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .set({
          email: email,
          firstName: firstName,
          lastName: lastname,
          unionId: union.id,
        });
    })
    .then(() => {
      return {
        uid: uid,
        email: email,
      };
    });
};

export const getUser = uid => {
  return firebase
    .firestore()
    .doc(`users/${uid}`)
    .get()
    .then(doc => doc.data());
};

export const updateUser = (uid, data) => {
  return firebase
    .firestore()
    .doc(`users/${uid}`)
    .update(data);
};

export const uploadAvatar = (uid, uri) => {
  const imageRef = firebase
    .storage()
    .ref('avatars')
    .child(uid);

  return imageRef
    .putFile(uri)
    .then(() => {
      return imageRef.getDownloadURL();
    })
    .then(url => {
      return firebase
        .firestore()
        .doc(`users/${uid}`)
        .update({avatar: url});
    });
};

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const updatePassword = (currentPassword, newPassword) => {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );
  return user
    .reauthenticateWithCredential(credential)
    .then(() => user.updatePassword(newPassword));
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const listenForAuthStatus = callback => {
  return firebase.auth().onAuthStateChanged(user => {
    callback(user);
  });
};

export const sendResetPasswordEmail = email => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const getAllUsers = () => {
  return firebase
    .firestore()
    .collection('users')
    .get()
    .then(response => {
      return response.docs.map(item => {
        const user = item.data();
        user.uid = item.id;
        return user;
      });
    });
};

export const getUnionUsers = unionId => {
  return firebase
    .firestore()
    .collection('users')
    .where('unionId', '==', unionId)
    .get()
    .then(response => {
      return response.docs.map(item => {
        const user = item.data();
        user.uid = item.id;
        return user;
      });
    });
};

export const getUnions = () => {
  return firebase
    .firestore()
    .collection('unions')
    .orderBy('name', 'asc')
    .get()
    .then(response => {
      let allUnions = [];
      response.docs.forEach(item => {
        let union = item.data();
        union.id = item.id;
        allUnions.push(union);
      });
      return allUnions;
    });
};

export const getUnion = unionId => {
  return firebase
    .firestore()
    .doc(`unions/${unionId}`)
    .get()
    .then(doc => ({id: doc.id, ...doc.data()}));
};
