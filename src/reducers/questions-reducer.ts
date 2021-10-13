import { AddQuestionsAction, Question } from "src/types";
import { ADD_QUESTION } from "../action";

const INITIAL_STATE: Question[] = [];

const questionsReducer = (
  state = INITIAL_STATE,
  { questions, type }: AddQuestionsAction
) => {
  switch (type) {
    case ADD_QUESTION:
      return questions;
    default:
      return state;
  }
};

export default questionsReducer;