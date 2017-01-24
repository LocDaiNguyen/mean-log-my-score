import { League } from './league.model';

import { ActionReducer, Action } from '@ngrx/store';

export const ADD_LEAGUE = 'ADD_LEAGUE';
export const CREATE_LEAGUE = 'CREATE_LEAGUE';
export const UPDATE_LEAGUE = 'UPDATE_LEAGUE';
export const DELETE_LEAGUE = 'DELETE_LEAGUE';

const comparator = 'id';

export const leagues: ActionReducer<League[]> = (state: League[] = [], action: Action) => {
  switch (action.type) {

    case ADD_LEAGUE:
      return action.payload;

    case CREATE_LEAGUE:
      return [...state, action.payload];

    case UPDATE_LEAGUE:
      return state.map(league => {
        return league[comparator] === action.payload[comparator] ? Object.assign({}, league, action.payload) : league;
      });

    case DELETE_LEAGUE:
      return state.filter(league => {
        return league[comparator] !== action.payload[comparator];
      });

    default:
      return state;
  }
};
