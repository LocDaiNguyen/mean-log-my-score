import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Player } from './player.model';

@Injectable()
export class PlayerService {

  private playersUrl = 'app/players';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  constructor(private http: Http) {}

  getAllPlayers(): Observable<Player[]> {
    return this.http.get(this.playersUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getPlayer(id: number | string): Observable<Player> {
    const playerUrl = `${this.playersUrl}/${id}`;
    return this.http.get(playerUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post(this.playersUrl, JSON.stringify(player), this.options)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updatePlayer(player: Player): Observable<Player> {
    const playerUrl = `${this.playersUrl}/${player.id}`;
    return this.http.put(playerUrl, JSON.stringify(player), this.options)
      .map(() => player)
      .catch(this.handleError);
  }

  deletePlayer(id: number | string): Observable<void> {
    const playerUrl = `${this.playersUrl}/${id}`;
    return this.http.delete(playerUrl, this.options)
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
