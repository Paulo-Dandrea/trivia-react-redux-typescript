import { combineReducers } from 'redux';
import userReducer from './userReducer';
import questionsReducer from './questionsReducer';
import timerReducer from './timerReducer';
import settingsReducer from './settingsReducer';

const reducer = combineReducers({
  userReducer,
  questionsReducer,
  timerReducer,
  settingsReducer,
});

export default reducer;
