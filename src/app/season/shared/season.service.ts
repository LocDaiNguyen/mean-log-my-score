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

  constructor(private http: Http) {}

  getAllSeasons(): Observable<Season[]> {
    return this.http.get(this.seasonUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getSeason(id: any): Observable<Season> {
    return this.getAllSeasons()
      .map((seasons: Season[]) => seasons.find((season: Season) => season.id === id))
      .catch(this.handleError);
  }

  createSeason(season: Season): Observable<Season> {
    return this.http.post(this.seasonUrl, JSON.stringify(season), {headers: this.headers})
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateSeason(season: Season): Observable<Season> {
    const seasonUrl = `${this.seasonUrl}/${season.id}`;
    return this.http.put(seasonUrl, JSON.stringify(season), {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteSeason(id: any): Observable<void> {
    const seasonUrl = `${this.seasonUrl}/${id}`;
    return this.http.delete(seasonUrl, {headers: this.headers})
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
