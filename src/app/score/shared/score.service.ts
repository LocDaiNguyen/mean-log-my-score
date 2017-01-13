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

  private scoreUrl = 'app/scores';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAllScores(): Observable<Score[]> {
    return this.http.get(this.scoreUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getScore(id: any): Observable<Score> {
    return this.getAllScores()
      .map((scores: Score[]) => scores.find((score: Score) => score.id === id))
      .catch(this.handleError);
  }

  createScore(score: Score): Observable<Score> {
    return this.http.post(this.scoreUrl, JSON.stringify(score), {headers: this.headers})
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateScore(score: Score): Observable<Score> {
    const scoreUrl = `${this.scoreUrl}/${score.id}`;
    return this.http.put(scoreUrl, JSON.stringify(score), {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteScore(id: any): Observable<void> {
    const scoreUrl = `${this.scoreUrl}/${id}`;
    return this.http.delete(scoreUrl, {headers: this.headers})
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
