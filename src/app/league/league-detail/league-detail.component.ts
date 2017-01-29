import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, FormControlName, FormArray, Validators } from '@angular/forms';

import { League } from '../shared/league.model';

@Component({
  selector: 'lms-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeagueDetailComponent implements OnInit {

  leagueForm: FormGroup;
  originalName: string;
  selectedLeague: League;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set league(value: League) {
    if (value) {
      this.originalName = value.leagueName;
      this.leagueForm.patchValue({
        leagueName: value.leagueName
      });
    }
    this.selectedLeague = Object.assign({}, value);
  }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.leagueForm = this.formBuilder.group({
      'leagueName': ['', Validators.required]
    });
  }

  save() {
    if (this.leagueForm.dirty && this.leagueForm.valid) {
      if (this.selectedLeague.id) {
        let league = Object.assign({}, this.selectedLeague, this.leagueForm.value);
        console.log('old', league);
        return this.saved.emit(league);
      }
      let newLeague: League = {
        leagueName: this.leagueForm.value.leagueName
      };
      console.log('new', newLeague);
      this.saved.emit(newLeague);
      this.resetValues();
    }
  }

  cancel(league: League) {
    this.resetValues();
    this.cancelled.emit(league);
  }

  resetValues() {
    this.leagueForm.reset();
  }

}
