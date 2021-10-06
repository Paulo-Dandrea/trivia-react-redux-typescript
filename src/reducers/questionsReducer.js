import { ADD_QUESTION, ADD_ERROR } from '../action';

const INITIAL_STATE = [];

const questionsReducer = (state = INITIAL_STATE, { questions, type, error }) => {
  switch (type) {
    case ADD_QUESTION:
      return questions;
    case ADD_ERROR:
      return [error.toString()];
    default:
      return state;
  }
};

export default questionsReducer;
