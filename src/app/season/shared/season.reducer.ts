import { Season } from './season.model';

import { ActionReducer, Action } from '@ngrx/store';

export const ADD_SEASON = 'ADD_SEASON';
export const CREATE_SEASON = 'CREATE_SEASON';
export const UPDATE_SEASON = 'UPDATE_SEASON';
export const DELETE_SEASON = 'DELETE_SEASON';

const comparator = 'id';

export const seasons: ActionReducer<Season[]> = (state: Season[] = [], action: Action) => {
  switch (action.type) {

    case ADD_SEASON:
      return action.payload;

    case CREATE_SEASON:
      return [...state, action.payload];

    case UPDATE_SEASON:
      return state.map(season => {
        return season[comparator] === action.payload[comparator] ? Object.assign({}, season, action.payload) : season;
      });

    case DELETE_SEASON:
      return state.filter(season => {
        return season[comparator] !== action.payload[comparator];
      });

    default:
      return state;
  }
};
