import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { Team } from './team.model';

@Injectable()
export class TeamService {

  private teamsUrl = 'app/teams';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAllTeams(): Observable<Team[]> {
    return this.http.get(this.teamsUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getTeam(id: any): Observable<Team> {
    return this.getAllTeams()
      .map(teams => teams.find(team => team.id === id))
      .catch(this.handleError);
  }

  createTeam(team): Observable<Team> {
    return this.http.post(this.teamsUrl, JSON.stringify(team), {headers: this.headers})
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateTeam(team): Observable<Team> {
    const teamUrl = `${this.teamsUrl}/${team.id}`;
    return this.http.put(teamUrl, JSON.stringify(team), {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  delteTeam(id: any): Observable<void> {
    const teamUrl = `${this.teamsUrl}/${id}`;
    return this.http.delete(teamUrl, {headers: this.headers})
      .map((response: Response) => response.json())
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
