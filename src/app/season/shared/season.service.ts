import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Season } from './season.model';

@Injectable()
export class SeasonService {

  private seasonUrl = 'app/seasons';
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = {headers: this.headers};

  constructor(private http: Http) {}

  getAllSeasons(): Observable<Season[]> {
    return this.http.get(this.seasonUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getSeason(id: number | string): Observable<Season> {
    const seasonUrl = `${this.seasonsUrl}/${id}`;
    return this.http.get(seasonUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  createSeason(season: Season): Observable<Season> {
    return this.http.post(this.seasonUrl, JSON.stringify(season), this.options)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateSeason(season: Season): Observable<Season> {
    const seasonUrl = `${this.seasonUrl}/${season.id}`;
    return this.http.put(seasonUrl, JSON.stringify(season), this.options)
      .map(() => season)
      .catch(this.handleError);
  }

  deleteSeason(id: number | string): Observable<void> {
    const seasonUrl = `${this.seasonUrl}/${id}`;
    return this.http.delete(seasonUrl, this.options)
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
