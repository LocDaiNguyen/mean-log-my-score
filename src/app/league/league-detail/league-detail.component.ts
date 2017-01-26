import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { League } from '../shared/league.model';

@Component({
  selector: 'lms-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeagueDetailComponent implements OnInit {

  originalName: string;
  selectedLeague: League;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set league(value: League) {
    if (value) { this.originalName = value.leagueName; }
    this.selectedLeague = Object.assign({}, value);
  }

  constructor() { }

  ngOnInit() { }

  save(form: NgForm) {
    if (this.selectedLeague.id) {
      return this.saved.emit(this.selectedLeague);
    }
    let newLeague: League = {
      leagueName: form.value.leagueName
    };
    this.saved.emit(newLeague);
    this.resetValues();
  }

  cancel(league: League) {
    this.resetValues();
    this.cancelled.emit(league);
  }

  resetValues() {
    this.selectedLeague = {id: null, leagueName: ''};
  }

}
