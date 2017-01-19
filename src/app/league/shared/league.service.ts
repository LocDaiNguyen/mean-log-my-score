import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { League } from './league.model';

@Injectable()
export class LeagueService {

  private leaguesUrl = 'app/leagues';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  constructor(private http: Http) {}

  getAllLeagues(): Observable<League[]> {
    return this.http.get(this.leaguesUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getLeague(id: number | string): Observable<League> {
    const leagueUrl = `${this.leaguesUrl}/${id}`;
    return this.http.get(leagueUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  createLeague(league: League): Observable<League> {
    return this.http.post(this.leaguesUrl, JSON.stringify(league), this.options)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateLeague(league: League): Observable<League> {
    const leagueUrl = `${this.leaguesUrl}/${league.id}`;
    return this.http.put(leagueUrl, JSON.stringify(league), this.options)
      .map(() => league)
      .catch(this.handleError);
  }

  deleteLeague(id: number | string): Observable<void> {
    const leagueUrl = `${this.leaguesUrl}/${id}`;
    return this.http.delete(leagueUrl, this.options)
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
