import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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

  divisionForm: FormGroup;
  originalName: string;
  selectedLeague: League;
  selectedDivision: Division;
  leagues$: Observable<League[]> = this.leagueService.leagues$;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set division(value: Division) {
    if (value) {
      this.originalName = value.divisionName;
      this.divisionForm.patchValue({
        leagueName: value.leagueName,
        divisionName: value.divisionName
      });
    }
    this.selectedDivision = Object.assign({}, value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.leagueService.getAllLeagues();

    this.divisionForm = this.formBuilder.group({
      'leagueName': {value: null, disabled: true},
      'league': [null, Validators.required],
      'divisionName': [null, Validators.required]
    });

    let leagueNameEl = this.divisionForm.get('leagueName');
    let leagueEl = this.divisionForm.get('league');
    let divisionNameEl = this.divisionForm.get('divisionName');

    this.divisionForm.get('divisionName').valueChanges
      .subscribe(
        (value) => {
          if (leagueNameEl.value !== null && leagueEl.value === null) {
            leagueEl.clearValidators();
            leagueEl.reset('');
          } else if (leagueNameEl.value === null && leagueEl.value === null) {
            leagueEl.setValidators(Validators.required);
            leagueEl.reset(null);
          }
        }
      );
  }

  save() {
    if (this.divisionForm.dirty && this.divisionForm.valid) {
      if (this.selectedDivision.id) {
        let division = Object.assign({}, this.selectedDivision, {divisionName: this.divisionForm.value.divisionName});
        console.log(division);
        return this.saved.emit(division);
      }
      let newDivision: Division = {
        divisionName: this.divisionForm.value.divisionName,
        leagueId: this.divisionForm.value.league.id,
        leagueName: this.divisionForm.value.league.leagueName
      };
      this.saved.emit(newDivision);
      this.resetValues();
    }
  }

  cancel(division: Division) {
    this.resetValues();
    this.cancelled.emit(division);
  }

  resetValues() {
    this.divisionForm.reset();
  }

}
