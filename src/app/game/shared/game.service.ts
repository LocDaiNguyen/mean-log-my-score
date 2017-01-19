import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Game } from './game.model';

@Injectable()
export class GameService {

  private gamesUrl = 'app/games';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  constructor(private http: Http) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get(this.gamesUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getGame(id: number | string): Observable<Game> {
    const gameUrl = `${this.gamesUrl}/${id}`;
    return this.http.get(gameUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post(this.gamesUrl, JSON.stringify(game), this.options)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateGame(game: Game): Observable<Game> {
    const gameUrl = `${this.gamesUrl}/${game.id}`;
    return this.http.put(gameUrl, JSON.stringify(game), this.options)
      .map(() => game)
      .catch(this.handleError);
  }

  deleteGame(id: number | string): Observable<void> {
    const gameUrl = `${this.gamesUrl}/${id}`;
    return this.http.delete(gameUrl, this.options)
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
