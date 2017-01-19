import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Score } from './score.model';

@Injectable()
export class ScoreService {

  private scoresUrl = 'app/scores';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  constructor(private http: Http) {}

  getAllScores(): Observable<Score[]> {
    return this.http.get(this.scoresUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getScore(id: number | string): Observable<Score> {
    const scoreUrl = `${this.scoresUrl}/${id}`;
    return this.http.get(scoreUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  createScore(score: Score): Observable<Score> {
    return this.http.post(this.scoresUrl, JSON.stringify(score), this.options)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateScore(score: Score): Observable<Score> {
    const scoreUrl = `${this.scoresUrl}/${score.id}`;
    return this.http.put(scoreUrl, JSON.stringify(score), this.options)
      .map(() => score)
      .catch(this.handleError);
  }

  deleteScore(id: number | string): Observable<void> {
    const scoreUrl = `${this.scoresUrl}/${id}`;
    return this.http.delete(scoreUrl, this.options)
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
