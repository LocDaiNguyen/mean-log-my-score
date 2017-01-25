import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Division } from '../shared/division.model';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';

@Component({
  selector: 'lms-division-detail',
  templateUrl: './division-detail.component.html',
  styleUrls: ['./division-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DivisionDetailComponent implements OnInit {

  originalName: string;
  selectedLeague: League;
  selectedDivision: Division;
  leagues$: Observable<League[]> = this.leagueService.leagues$;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set division(value: Division) {
    if (value) { this.originalName = value.divisionName; }
    this.selectedDivision = Object.assign({}, value);
  }

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.leagueService.getAllLeagues();
  }

  save(form: NgForm) {
    if (this.selectedDivision.id) {
      return this.saved.emit(this.selectedDivision);
    }
    let newDivision: Division = {
      divisionName: form.value.divisionName,
      leagueId: form.value.league.id,
      leagueName: form.value.league.leagueName
    };
    this.saved.emit(newDivision);
    this.resetValues();
  }

  cancel(division: Division) {
    this.resetValues();
    this.cancelled.emit(division);
  }

  resetValues() {
    this.selectedLeague = {id: null, leagueName: ''};
  }

}
