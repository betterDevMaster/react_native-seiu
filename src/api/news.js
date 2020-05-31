import firebase from 'react-native-firebase';

export const getNews = () => {
  return firebase
    .firestore()
    .collection('news')
    .orderBy('date', 'desc')
    .get()
    .then(response => {
      let allNews = [];
      response.docs.forEach(item => {
        let news = item.data();
        news.id = item.id;
        allNews.push(news);
      });
      return allNews;
    });
};
