import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { League } from './league.model';
import { AppStore } from '../../app.store';
import { ADD_LEAGUE, CREATE_LEAGUE, UPDATE_LEAGUE, DELETE_LEAGUE } from './league.reducer';

@Injectable()
export class LeagueService {

  private leaguesUrl = 'app/leagues';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  leagues$: Observable<League[]> = this.store.select('leagues');

  constructor(
    private http: Http,
    private store: Store<AppStore>
  ) {}

  getAllLeagues() {
    return this.http.get(this.leaguesUrl)
      .map(response => response.json().data)
      .map(payload => ({ type: ADD_LEAGUE, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  saveLeague(league: League) {
    return (league.id) ? this.updateLeague(league) : this.createLeague(league);
  }

  createLeague(league: League) {
    return this.http.post(this.leaguesUrl, JSON.stringify(league), this.options)
      .map(response => response.json().data)
      .map(payload => ({ type: CREATE_LEAGUE, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateLeague(league: League) {
    const leagueUrl = `${this.leaguesUrl}/${league.id}`;
    return this.http.put(leagueUrl, JSON.stringify(league), this.options)
      .subscribe(action => this.store.dispatch({ type: UPDATE_LEAGUE, payload: league }));
  }

  deleteLeague(league: League) {
    const leagueUrl = `${this.leaguesUrl}/${league.id}`;
    return this.http.delete(leagueUrl, this.options)
      .subscribe(action => this.store.dispatch({ type: DELETE_LEAGUE, payload: league }));
  }
}
