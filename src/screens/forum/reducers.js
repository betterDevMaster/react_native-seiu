import {SET_CATEGORIES} from './actionTypes';

const INITIAL_STATE = {
  categories: [],
};

export default function forum(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    default:
      return state;
  }
}
