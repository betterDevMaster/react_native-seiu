import {SET_EVENTS, SET_CURRENT_EVENT} from './actionTypes';

export const setEvents = events => {
  let sortedEvents = events.sort((a, b) => {
    const first = new Date(a.date);
    const second = new Date(b.date);

    return first - second;
  });
  return {type: SET_EVENTS, events: sortedEvents};
};

export const setCurrentEvent = currentEvent => {
  return {type: SET_CURRENT_EVENT, currentEvent};
};
