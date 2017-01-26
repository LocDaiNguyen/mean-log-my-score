import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { Score } from './score.model';
import { AppStore } from '../../app.store';
import { ADD_SCORE, CREATE_SCORE, UPDATE_SCORE, DELETE_SCORE } from './score.reducer';

@Injectable()
export class ScoreService {

  private scoresUrl = 'app/scores';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  scores$: Observable<Score[]> = this.store.select('scores');

  constructor(
    private http: Http,
    private store: Store<AppStore>
  ) {}

  getAllScores() {
    return this.http.get(this.scoresUrl)
      .map(response => response.json().data)
      .map(payload => ({ type: ADD_SCORE, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  saveScore(score: Score) {
    return (score.id) ? this.updateScore(score) : this.createScore(score);
  }

  createScore(score: Score) {
    return this.http.post(this.scoresUrl, JSON.stringify(score), this.options)
      .map(response => response.json().data)
      .map(payload => ({ type: CREATE_SCORE, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateScore(score: Score) {
    const scoreUrl = `${this.scoresUrl}/${score.id}`;
    return this.http.put(scoreUrl, JSON.stringify(score), this.options)
      .subscribe(action => this.store.dispatch({ type: UPDATE_SCORE, payload: score }));
  }

  deleteScore(score: Score) {
    const scoreUrl = `${this.scoresUrl}/${score.id}`;
    return this.http.delete(scoreUrl, this.options)
      .subscribe(action => this.store.dispatch({ type: DELETE_SCORE, payload: score }));
  }
}
