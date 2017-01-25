import { Game } from './game.model';

import { ActionReducer, Action } from '@ngrx/store';

export const ADD_GAME = 'ADD_GAME';
export const CREATE_GAME = 'CREATE_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';

const comparator = 'id';

export const games: ActionReducer<Game[]> = (state: Game[] = [], action: Action) => {
  switch (action.type) {

    case ADD_GAME:
      return action.payload;

    case CREATE_GAME:
      return [...state, action.payload];

    case UPDATE_GAME:
      return state.map(game => {
        return game[comparator] === action.payload[comparator] ? Object.assign({}, game, action.payload) : game;
      });

    case DELETE_GAME:
      return state.filter(game => {
        return game[comparator] !== action.payload[comparator];
      });

    default:
      return state;
  }
};
