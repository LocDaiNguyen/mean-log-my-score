import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { Player } from './player.model';
import { AppStore } from '../../app.store';
import { ADD_PLAYER, CREATE_PLAYER, UPDATE_PLAYER, DELETE_PLAYER } from './player.reducer';

@Injectable()
export class PlayerService {

  private playersUrl = 'app/players';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  players$: Observable<Player[]> = this.store.select('players');

  constructor(
    private http: Http,
    private store: Store<AppStore>
  ) {}

  getAllPlayers() {
    return this.http.get(this.playersUrl)
      .map(response => response.json().data)
      .map(payload => ({ type: ADD_PLAYER, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  savePlayer(player: Player) {
    return (player.id) ? this.updatePlayer(player) : this.createPlayer(player);
  }

  createPlayer(player: Player) {
    return this.http.post(this.playersUrl, JSON.stringify(player), this.options)
      .map(response => response.json().data)
      .map(payload => ({ type: CREATE_PLAYER, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updatePlayer(player: Player) {
    const playerUrl = `${this.playersUrl}/${player.id}`;
    return this.http.put(playerUrl, JSON.stringify(player), this.options)
      .subscribe(action => this.store.dispatch({ type: UPDATE_PLAYER, payload: player }));
  }

  deletePlayer(player: Player) {
    const playerUrl = `${this.playersUrl}/${player.id}`;
    return this.http.delete(playerUrl, this.options)
      .subscribe(action => this.store.dispatch({ type: DELETE_PLAYER, payload: player }));
  }
}
