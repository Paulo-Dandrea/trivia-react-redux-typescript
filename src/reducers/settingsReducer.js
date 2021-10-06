import { CHANGE_SETTINGS } from "../action";

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

export default function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_SETTINGS:
      return ({
        ...state,
        [action.name]: action.value,
      });
    default:
      return state;
  }
}
