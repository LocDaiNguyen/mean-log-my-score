import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { Season } from './season.model';
import { AppStore } from '../../app.store';
import { ADD_SEASON, CREATE_SEASON, UPDATE_SEASON, DELETE_SEASON } from './season.reducer';

@Injectable()
export class SeasonService {

  private seasonsUrl = 'app/seasons';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  seasons$: Observable<Season[]> = this.store.select('seasons');

  constructor(
    private http: Http,
    private store: Store<AppStore>
  ) {}

  getAllSeasons() {
    return this.http.get(this.seasonsUrl)
      .map(response => response.json().data)
      .map(payload => ({ type: ADD_SEASON, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  saveSeason(season: Season) {
    return (season.id) ? this.updateSeason(season) : this.createSeason(season);
  }

  createSeason(season: Season) {
    return this.http.post(this.seasonsUrl, JSON.stringify(season), this.options)
      .map(response => response.json().data)
      .map(payload => ({ type: CREATE_SEASON, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateSeason(season: Season) {
    const seasonUrl = `${this.seasonsUrl}/${season.id}`;
    return this.http.put(seasonUrl, JSON.stringify(season), this.options)
      .subscribe(action => this.store.dispatch({ type: UPDATE_SEASON, payload: season }));
  }

  deleteSeason(season: Season) {
    const seasonUrl = `${this.seasonsUrl}/${season.id}`;
    return this.http.delete(seasonUrl, this.options)
      .subscribe(action => this.store.dispatch({ type: DELETE_SEASON, payload: season }));
  }
}
