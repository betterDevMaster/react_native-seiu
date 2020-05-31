import firebase from 'react-native-firebase';

export const getCategories = (userId) => {
  return firebase
    .firestore()
    .collection('forum')
    .get()
    .then(async response => {
      const promises = response.docs.map(async snapCategory => {
        const category = snapCategory.data();
        category.id = snapCategory.id;
        category.topicCount = await firebase
          .firestore()
          .collection(`forum/${snapCategory.id}/topics`)
          .get()
          .then(response => {
            let topicCount = 0;
            response.docs.forEach(snapTopic => {
              const topic = snapTopic.data();
              if (topic.offensiveContent) {
                return;
              }
              if (!topic.type ||
                topic.type === 'public' ||
                (topic.type === 'private' && topic.users.includes(userId))
              ) {
                topicCount += 1;
              }
            });
            return topicCount;
          });
        return category;
      });
      return await Promise.all(promises);
    });
};

export const getTopics = categoryId => {
  return firebase
    .firestore()
    .collection(`forum/${categoryId}/topics`)
    .orderBy('updatedAt', 'desc')
    .get()
    .then(response => {
      let allTopics = [];
      response.docs.forEach(item => {
        let topic = item.data();
        topic.id = item.id;
        allTopics.push(topic);
      });
      return allTopics;
    });
};

export const createTopic = (categoryId, data) => {
  return firebase
    .firestore()
    .collection(`forum/${categoryId}/topics`)
    .add(data)
    .then(() => {
      return firebase
        .firestore()
        .doc(`forum/${categoryId}`)
        .update({
          topicCount: firebase.firestore.FieldValue.increment(1),
        });
    });
};

export const deleteTopic = (categoryId, topicId) => {
  return firebase
    .firestore()
    .doc(`forum/${categoryId}/topics/${topicId}`)
    .delete()
    .then(() => {
      return firebase
        .firestore()
        .doc(`forum/${categoryId}`)
        .update({
          topicCount: firebase.firestore.FieldValue.increment(-1),
        });
    });
};

export const editTopic = (categoryId, topicId, title, type, users) => {
  return firebase
    .firestore()
    .doc(`forum/${categoryId}/topics/${topicId}`)
    .update({
      title,
      type,
      users: [...users],
    });
};

export const getThreads = (categoryId, topicId) => {
  return firebase
    .firestore()
    .collection(`forum/${categoryId}/topics/${topicId}/threads`)
    .orderBy('date', 'desc')
    .get()
    .then(response => {
      let allThreads = [];
      response.docs.forEach(item => {
        let thread = item.data();
        thread.id = item.id;
        allThreads.push(thread);
      });
      return allThreads;
    });
};

export const updateThread = (categoryId, topicId, threadId, data) => {
  return firebase
    .firestore()
    .doc(`forum/${categoryId}/topics/${topicId}/threads/${threadId}`)
    .update(data);
};

export const createThread = (categoryId, topicId, data) => {
  return firebase
    .firestore()
    .collection(`forum/${categoryId}/topics/${topicId}/threads`)
    .add(data)
    .then(() => {
      return firebase
        .firestore()
        .doc(`forum/${categoryId}/topics/${topicId}`)
        .update({
          updatedAt: data.date,
          replyCount: firebase.firestore.FieldValue.increment(1),
        });
    });
};
