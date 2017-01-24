import { Division } from './division.model';

import { ActionReducer, Action } from '@ngrx/store';

export const ADD_DIVISION = 'ADD_DIVISION';
export const CREATE_DIVISION = 'CREATE_DIVISION';
export const UPDATE_DIVISION = 'UPDATE_DIVISION';
export const DELETE_DIVISION = 'DELETE_DIVISION';

const comparator = 'id';

export const divisions: ActionReducer<Division[]> = (state: Division[] = [], action: Action) => {
  switch (action.type) {

    case ADD_DIVISION:
      return action.payload;

    case CREATE_DIVISION:
      return [...state, action.payload];

    case UPDATE_DIVISION:
      return state.map(division => {
        return division[comparator] === action.payload[comparator] ? Object.assign({}, division, action.payload) : division;
      });

    case DELETE_DIVISION:
      return state.filter(division => {
        return division[comparator] !== action.payload[comparator];
      });

    default:
      return state;
  }
};
