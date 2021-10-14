import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import questionsReducer from './questions-reducer';
import timerReducer from './timer-reducer';
import settingsReducer from './settings-reducer';


const rootReducer = combineReducers({
  userReducer,
  questionsReducer,
  timerReducer,
  settingsReducer,
});


export default rootReducer;
