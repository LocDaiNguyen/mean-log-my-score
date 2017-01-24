import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Division } from './shared/division.model';
import { DivisionService } from './shared/division.service';

@Component({
  selector: 'lms-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  divisions$: Observable<Division[]>;
  selectedDivision: Division;

  constructor(
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
    this.divisions$ = this.divisionService.divisions$;
    this.divisionService.getAllDivisions();
  }

  resetDivision() {
    let emptyDivision = {id: null, divisionName: '', leagueId: null, leagueName: ''};
    this.selectedDivision = emptyDivision;
  }

  selectDivision(division: Division) {
    this.selectedDivision = division;
  }

  saveDivision(division: Division) {
    this.divisionService.saveDivision(division);
    this.resetDivision();
  }

  deleteDivision(division: Division) {
    this.divisionService.deleteDivision(division);
    this.resetDivision();
  }

}
