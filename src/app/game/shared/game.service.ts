import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { Game } from './game.model';
import { AppStore } from '../../app.store';
import { ADD_GAME, CREATE_GAME, UPDATE_GAME, DELETE_GAME } from './game.reducer';

@Injectable()
export class GameService {

  private gamesUrl = 'app/games';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  games$: Observable<Game[]> = this.store.select('games');

  constructor(
    private http: Http,
    private store: Store<AppStore>
  ) {}

  getAllGames() {
    return this.http.get(this.gamesUrl)
      .map(response => response.json().data)
      .map(payload => ({ type: ADD_GAME, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  saveGame(game: Game) {
    return (game.id) ? this.updateGame(game) : this.createGame(game);
  }

  createGame(game: Game) {
    return this.http.post(this.gamesUrl, JSON.stringify(game), this.options)
      .map(response => response.json().data)
      .map(payload => ({ type: CREATE_GAME, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateGame(game: Game) {
    const gameUrl = `${this.gamesUrl}/${game.id}`;
    return this.http.put(gameUrl, JSON.stringify(game), this.options)
      .subscribe(action => this.store.dispatch({ type: UPDATE_GAME, payload: game }));
  }

  deleteGame(game: Game) {
    const gameUrl = `${this.gamesUrl}/${game.id}`;
    return this.http.delete(gameUrl, this.options)
      .subscribe(action => this.store.dispatch({ type: DELETE_GAME, payload: game }));
  }
}
