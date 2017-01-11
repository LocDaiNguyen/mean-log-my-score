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

import { League } from './league.model';

@Injectable()
export class LeagueService {

  private leaguesUrl = 'app/leagues';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAllLeagues(): Observable<League[]> {
    return this.http.get(this.leaguesUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getLeague(id: any): Observable<League> {
    return this.getAllLeagues()
      .map(leagues => leagues.find(league => league.id === id))
      .catch(this.handleError);
  }

  createLeague(league: League): Observable<League> {
    return this.http.post(this.leaguesUrl, JSON.stringify(league), {headers: this.headers})
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateLeague(league: League): Observable<League> {
    const leagueUrl = `${this.leaguesUrl}/${league.id}`;
    return this.http.put(leagueUrl, JSON.stringify(league), {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteLeague(id: any): Observable<void> {
    const leagueUrl = `${this.leaguesUrl}/${id}`;
    return this.http.delete(leagueUrl, {headers: this.headers})
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
