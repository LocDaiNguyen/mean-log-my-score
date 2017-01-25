import { Team } from './team.model';

import { ActionReducer, Action } from '@ngrx/store';

export const ADD_TEAM = 'ADD_TEAM';
export const CREATE_TEAM = 'CREATE_TEAM';
export const UPDATE_TEAM = 'UPDATE_TEAM';
export const DELETE_TEAM = 'DELETE_TEAM';

const comparator = 'id';

export const teams: ActionReducer<Team[]> = (state: Team[] = [], action: Action) => {
  switch (action.type) {

    case ADD_TEAM:
      return action.payload;

    case CREATE_TEAM:
      return [...state, action.payload];

    case UPDATE_TEAM:
      return state.map(team => {
        return team[comparator] === action.payload[comparator] ? Object.assign({}, team, action.payload) : team;
      });

    case DELETE_TEAM:
      return state.filter(team => {
        return team[comparator] !== action.payload[comparator];
      });

    default:
      return state;
  }
};
