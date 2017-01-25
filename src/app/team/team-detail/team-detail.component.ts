import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Team } from '../shared/team.model';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';

@Component({
  selector: 'lms-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamDetailComponent implements OnInit {

  originalName: string;
  selectedTeam: Team;
  selectedLeague: League;
  leagues$: Observable<League[]> = this.leagueService.leagues$;
  league = { leagueId: null };
  selectedDivision: Division;
  divisions$: Observable<Division[]> = this.divisionService.divisions$;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set team(value: Team) {
    if (value) { this.originalName = value.teamName; }
    this.selectedTeam = Object.assign({}, value);
  }

  constructor(
    private leagueService: LeagueService,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {;
    this.leagueService.getAllLeagues();
    this.divisionService.getAllDivisions();
  }

  save(form: NgForm) {
    if (this.selectedTeam.id) {
      return this.saved.emit(this.selectedTeam);
    }
    let newTeam: Team = {
      teamName: form.value.teamName,
      leagueId: form.value.league.id,
      leagueName: form.value.league.leagueName,
      divisionId: form.value.division.id,
      divisionName: form.value.division.divisionName
    };
    this.saved.emit(newTeam);
    this.resetValues();
  }

  cancel(team: Team) {
    this.resetValues();
    this.cancelled.emit(team);
  }

  resetValues() {
    this.selectedLeague = {id: null, leagueName: ''};
    this.selectedDivision = {id: null, divisionName: '', leagueId: null, leagueName: ''};
  }

  onChangeLeague(league): void {
    this.league = { leagueId: league.id };
  }

}
