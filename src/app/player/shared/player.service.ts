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

import { Player } from './player.model';

@Injectable()
export class PlayerService {

  private playersUrl = 'app/players';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAllPlayers(): Observable<Player[]> {
    return this.http.get(this.playersUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getPlayer(id: any): Observable<Player> {
    return this.getAllPlayers()
      .map((players: Player[]) => players.find((player: Player) => player.id === id))
      .catch(this.handleError);
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post(this.playersUrl, JSON.stringify(player), {headers: this.headers})
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updatePlayer(player: Player): Observable<Player> {
    const playerUrl = `${this.playersUrl}/${player.id}`;
    return this.http.put(playerUrl, JSON.stringify(player), {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deletePlayer(id: any): Observable<void> {
    const playerUrl = `${this.playersUrl}/${id}`;
    return this.http.delete(playerUrl, {headers: this.headers})
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
