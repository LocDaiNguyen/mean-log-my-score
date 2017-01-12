import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Division } from './division.model';

@Injectable()
export class DivisionService {

  private divisionsUrl = 'app/divisions';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAllDivisions(): Observable<Division[]> {
    return this.http.get(this.divisionsUrl)
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  getDivision(id: any): Observable<Division> {
    return this.getAllDivisions()
      .map((divisions: Division[]) => divisions.find((division: Division) => division.id === id))
      .catch(this.handleError);
  }

  createDivisiion(division: Division): Observable<Division> {
    return this.http.post(this.divisionsUrl, JSON.stringify(division), {headers: this.headers})
      .map((response: Response) => response.json().data)
      .catch(this.handleError);
  }

  updateDivision(division: Division): Observable<Division> {
    const divisionUrl = `${this.divisionsUrl}/${division.id}`;
    return this.http.put(divisionUrl, JSON.stringify(division), {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteDivision(id: any): Observable<void> {
    const divisionUrl = `${this.divisionsUrl}/${id}`;
    return this.http.delete(divisionUrl, {headers: this.headers})
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
