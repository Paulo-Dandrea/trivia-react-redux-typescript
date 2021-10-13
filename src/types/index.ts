import { ADD_QUESTION, ADD_SCORE, ADD_USER, CHANGE_SETTINGS, IS_DISABLED, SET_TIMER } from "src/action";
import rootReducer from "../reducers";

export type RootState = ReturnType<typeof rootReducer>;

export interface AddUserAction {
  type: typeof ADD_USER;
  name: string;
  email: string;
}

export interface AddScoreAction {
  type: typeof ADD_SCORE;
  score: number;
}

export type UserActions = AddUserAction | AddScoreAction;

export type Answer = {
  answer: string;
  "data-testid": string;
  style: {
    border: string;
  };
};

export type Question = {
  question: string;
  category: string;
  answers: Answer[];
  difficulty: string;
  type: string;
};

export interface AddQuestionsAction {
  type: typeof ADD_QUESTION;
  questions: Question[];
}

export interface SetTimer {
  type: typeof SET_TIMER;
  timer: number;
}

export interface IsDisabled {
  type: typeof IS_DISABLED;
  disabled: boolean;
}

export type TimerActions = SetTimer | IsDisabled;

type ActionKeys = 'category' | 'difficulty' | 'type';

export interface SettingsAction {
  type: typeof CHANGE_SETTINGS;
  name: ActionKeys;
  value: string;
}

export interface RankPlayer {
  name: string;
  picture: string;
  score: number;
}