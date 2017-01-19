import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Team } from './team.model';

@Injectable()
export class TeamService {

  private teamsUrl = 'app/teams';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  constructor(private http: Http) {}

  getAllTeams(): Observable<Team[]> {
    return this.http.get(this.teamsUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getTeam(id: number | string): Observable<Team> {
    const teamUrl = `${this.teamsUrl}/${id}`;
    return this.http.get(teamUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post(this.teamsUrl, JSON.stringify(team), this.options)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateTeam(team: Team): Observable<Team> {
    const teamUrl = `${this.teamsUrl}/${team.id}`;
    return this.http.put(teamUrl, JSON.stringify(team), this.options)
      .map(() => team)
      .catch(this.handleError);
  }

  delteTeam(id: number | string): Observable<void> {
    const teamUrl = `${this.teamsUrl}/${id}`;
    return this.http.delete(teamUrl, this.options)
      .map(() => null)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
