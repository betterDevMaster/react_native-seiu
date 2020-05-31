import {SET_USER, LOGOUT, SET_UNION} from './actionTypes';

export const setUser = payload => {
  return {type: SET_USER, payload};
};

export const logout = () => {
  return {type: LOGOUT};
};

export const setUnion = union => {
  return {
    type: SET_UNION,
    union,
  };
};
