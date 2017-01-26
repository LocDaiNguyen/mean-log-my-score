import { Score } from './score.model';

import { ActionReducer, Action } from '@ngrx/store';

export const ADD_SCORE = 'ADD_SCORE';
export const CREATE_SCORE = 'CREATE_SCORE';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const DELETE_SCORE = 'DELETE_SCORE';

const comparator = 'id';

export const scores: ActionReducer<Score[]> = (state: Score[] = [], action: Action) => {
  switch (action.type) {

    case ADD_SCORE:
      return action.payload;

    case CREATE_SCORE:
      return [...state, action.payload];

    case UPDATE_SCORE:
      return state.map(score => {
        return score[comparator] === action.payload[comparator] ? Object.assign({}, score, action.payload) : score;
      });

    case DELETE_SCORE:
      return state.filter(score => {
        return score[comparator] !== action.payload[comparator];
      });

    default:
      return state;
  }
};
