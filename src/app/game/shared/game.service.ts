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

  private gameUrl = 'app/games';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get(this.gameUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getGame(id: any): Observable<Game> {
    return this.getAllGames()
      .map((games: Game[]) => games.find((game: Game) => game.id === id))
      .catch(this.handleError);
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post(this.gameUrl, JSON.stringify(game), {headers: this.headers})
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateGame(game: Game): Observable<Game> {
    const gameUrl = `${this.gameUrl}/${game.id}`;
    return this.http.put(gameUrl, JSON.stringify(game), {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteGame(id: any): Observable<void> {
    const gameUrl = `${this.gameUrl}/${id}`;
    return this.http.delete(gameUrl, {headers: this.headers})
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
