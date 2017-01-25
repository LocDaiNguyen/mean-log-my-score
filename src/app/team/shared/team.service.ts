import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { Team } from './team.model';
import { AppStore } from '../../app.store';
import { ADD_TEAM, CREATE_TEAM, UPDATE_TEAM, DELETE_TEAM } from './team.reducer';

@Injectable()
export class TeamService {

  private teamsUrl = 'app/teams';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  teams$: Observable<Team[]> = this.store.select('teams');

  constructor(
    private http: Http,
    private store: Store<AppStore>
  ) {}

  getAllTeams() {
    return this.http.get(this.teamsUrl)
      .map(response => response.json().data)
      .map(payload => ({ type: ADD_TEAM, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  saveTeam(team: Team) {
    return (team.id) ? this.updateTeam(team) : this.createTeam(team);
  }

  createTeam(team: Team) {
    return this.http.post(this.teamsUrl, JSON.stringify(team), this.options)
      .map(response => response.json().data)
      .map(payload => ({ type: CREATE_TEAM, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateTeam(team: Team) {
    const teamUrl = `${this.teamsUrl}/${team.id}`;
    return this.http.put(teamUrl, JSON.stringify(team), this.options)
      .subscribe(action => this.store.dispatch({ type: UPDATE_TEAM, payload: team }));
  }

  deleteTeam(team: Team) {
    const teamUrl = `${this.teamsUrl}/${team.id}`;
    return this.http.delete(teamUrl, this.options)
      .subscribe(action => this.store.dispatch({ type: DELETE_TEAM, payload: team }));
  }
}
