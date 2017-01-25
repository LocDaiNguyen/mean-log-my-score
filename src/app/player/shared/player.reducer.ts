import { Player } from './player.model';

import { ActionReducer, Action } from '@ngrx/store';

export const ADD_PLAYER = 'ADD_PLAYER';
export const CREATE_PLAYER = 'CREATE_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const DELETE_PLAYER = 'DELETE_PLAYER';

const comparator = 'id';

export const players: ActionReducer<Player[]> = (state: Player[] = [], action: Action) => {
  switch (action.type) {

    case ADD_PLAYER:
      return action.payload;

    case CREATE_PLAYER:
      return [...state, action.payload];

    case UPDATE_PLAYER:
      return state.map(player => {
        return player[comparator] === action.payload[comparator] ? Object.assign({}, player, action.payload) : player;
      });

    case DELETE_PLAYER:
      return state.filter(player => {
        return player[comparator] !== action.payload[comparator];
      });

    default:
      return state;
  }
};
