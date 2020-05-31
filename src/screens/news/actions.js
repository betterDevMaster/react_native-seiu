import {SET_NEWS, SET_CURRENT_NEWS} from './actionTypes';
import {AsyncStorage} from 'react-native';
const Entities = require('html-entities').AllHtmlEntities;

export const setNews = news => {
  return {type: SET_NEWS, news};
};

export const setCurrentNews = currentNews => {
  const entities = new Entities();
  AsyncStorage.setItem(
    'news',
    currentNews.title +
      '\n' +
      entities.decode(currentNews.content.replace(/<\/?[^>]+>/gi, ' ')),
  );
  AsyncStorage.setItem('newsTitle', currentNews.title);
  return {type: SET_CURRENT_NEWS, currentNews};
};
