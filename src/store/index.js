import {createStore, combineReducers} from 'redux';
import login from '../screens/login/reducers';
import register from '../screens/register/reducers';
import news from '../screens/news/reducers';
import events from '../screens/events/reducers';
import forum from '../screens/forum/reducers';

const rootReducer = combineReducers({
  login,
  register,
  news,
  events,
  forum,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
