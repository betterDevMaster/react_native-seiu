import {SET_CURRENT_EVENT, SET_EVENTS} from './actionTypes';

const INITIAL_STATE = {
  events: [],
  currentEvent: null,
};

export default function events(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: [...action.events],
      };
    case SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: {...action.currentEvent},
      };
    default:
      return state;
  }
}
