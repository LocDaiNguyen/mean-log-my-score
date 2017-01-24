import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { Division } from './division.model';
import { AppStore } from '../../app.store';
import { ADD_DIVISION, CREATE_DIVISION, UPDATE_DIVISION, DELETE_DIVISION } from './division.reducer';

@Injectable()
export class DivisionService {

  private divisionsUrl = 'app/divisions';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  divisions$: Observable<Division[]> = this.store.select('divisions');

  constructor(
    private http: Http,
    private store: Store<AppStore>
  ) {}

  getAllDivisions() {
    return this.http.get(this.divisionsUrl)
      .map(response => response.json().data)
      .map(payload => ({ type: ADD_DIVISION, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  saveDivision(division: Division) {
    return (division.id) ? this.updateDivision(division) : this.createDivision(division);
  }

  createDivision(division: Division) {
    return this.http.post(this.divisionsUrl, JSON.stringify(division), this.options)
      .map(response => response.json().data)
      .map(payload => ({ type: CREATE_DIVISION, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateDivision(division: Division) {
    const divisionUrl = `${this.divisionsUrl}/${division.id}`;
    return this.http.put(divisionUrl, JSON.stringify(division), this.options)
      .subscribe(action => this.store.dispatch({ type: UPDATE_DIVISION, payload: division }));
  }

  deleteDivision(division: Division) {
    const divisionUrl = `${this.divisionsUrl}/${division.id}`;
    return this.http.delete(divisionUrl, this.options)
      .subscribe(action => this.store.dispatch({ type: DELETE_DIVISION, payload: division }));
  }
}
