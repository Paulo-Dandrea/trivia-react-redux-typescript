import fetchQuestions from "../lib/services";

export const IS_REQUESTING = "IS_REQUESTING";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_USER = "ADD_USER";
export const SET_TIMER = "SET_TIMER";
export const IS_DISABLED = "IS_DISABLED";
export const ADD_SCORE = "ADD_SCORE";
export const CHANGE_SETTINGS = "CHANGE_SETTINGS";
export const ADD_ERROR = "ADD_ERROR";


export function fetchAndAddQuestions(settings) {
  return (dispatch) => {
    dispatch(isRequesting());
    return fetchQuestions(settings).then(
      (questions) => dispatch(addQuestions(questions)),
      (error) => dispatch(addError(error))
    );
  };
}

const addQuestions = (questions) => ({
  type: ADD_QUESTION,
  questions,
});

export function addError(error) {
  return {
    type: ADD_ERROR,
    error,
  };
}

export function changeSettings(name, value) {
  return {
    type: CHANGE_SETTINGS,
    name,
    value,
  };
}

export function disableButton(disabled) {
  return {
    type: IS_DISABLED,
    disabled,
  };
}

export function setTimer(timer) {
  return {
    type: SET_TIMER,
    timer,
  };
}

export function addScore(score) {
  return {
    type: ADD_SCORE,
    score,
  };
}

export function addUser({ name, email }) {
  return {
    type: ADD_USER,
    name,
    email,
  };
}

const isRequesting = () => ({
  type: IS_REQUESTING,
});
