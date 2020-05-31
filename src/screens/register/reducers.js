import {SET_USER, LOGOUT, SET_UNION} from './actionTypes';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {
    uid: null,
    email: null,
    firstName: '',
    lastName: '',
    union: {},
    avatar: '',
    notifications: false,
  },
  union: null,
};

export default function register(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case SET_UNION:
      return {
        ...state,
        union: {...action.union},
      };
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
}
