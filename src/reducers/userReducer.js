import { ADD_USER, ADD_SCORE } from '../action';

const CryptoJS = require('crypto-js');

const INITIAL_STATE = [];

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        name: action.name,
        email: action.email,
        hash: CryptoJS.MD5(action.email.toLowerCase()).toString(),
      };
    case ADD_SCORE:
      return {
        ...state,
        score: action.score,
      };
    default:
      return state;
  }
};

export default userReducer;
