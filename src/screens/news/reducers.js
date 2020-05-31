import {SET_CURRENT_NEWS, SET_NEWS} from './actionTypes';

const INITIAL_STATE = {
  news: [],
  currentNews: null,
};

export default function news(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: [...action.news],
      };
    case SET_CURRENT_NEWS:
      return {
        ...state,
        currentNews: {...action.currentNews},
      };
    default:
      return state;
  }
}
