import { TimerActions } from 'src/types';
import { SET_TIMER, IS_DISABLED } from '../action';

const INITIAL_STATE = {
  timer: 0,
  disabled: false,
};

export default function timerReducer(state = INITIAL_STATE, action: TimerActions) {
  switch (action.type) {
    case SET_TIMER:
      return {
        ...state,
        timer:
          state.timer + action.timer > 30 ? 30 : state.timer + action.timer,
      };
    case IS_DISABLED:
      console.log('is disabled');
      return {
        ...state,
        disabled: action.disabled,
      };
    default:
      return state;
  }
}
