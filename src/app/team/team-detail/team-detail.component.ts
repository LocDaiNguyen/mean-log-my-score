import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

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

  teamForm: FormGroup;
  originalName: string;
  selectedTeam: Team;
  leagues$: Observable<League[]> = this.leagueService.leagues$;
  divisions$: Observable<Division[]> = this.divisionService.divisions$;
  league = { leagueId: null };

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set team(value: Team) {
    if (value) {
      this.originalName = value.teamName;
      this.teamForm.patchValue({
        leagueName: value.leagueName,
        divisionName: value.divisionName,
        teamName: value.teamName
      });
    }
    this.selectedTeam = Object.assign({}, value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private leagueService: LeagueService,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {;
    this.leagueService.getAllLeagues();
    this.divisionService.getAllDivisions();

    this.teamForm = this.formBuilder.group({
      'leagueName': {value: null, disabled: true},
      'league': [null, Validators.required],
      'divisionName': {value: null, disabled: true},
      'division': [null, Validators.required],
      'teamName': [null, Validators.required]
    });

    let leagueNameEl = this.teamForm.get('leagueName');
    let leagueEl = this.teamForm.get('league');
    let divisionNameEl = this.teamForm.get('divisionName');
    let divisionEl = this.teamForm.get('division');
    let teamNameEl = this.teamForm.get('teamName');

    leagueEl.valueChanges
      .subscribe(
        (league) => {
          if (leagueEl.value !== null) {
            this.league = { leagueId: league.id };
            divisionEl.reset(null);
          }
        }
      );

    teamNameEl.valueChanges
      .subscribe(
        (value) => {
          if (leagueNameEl.value !== null && leagueEl.value === null) {
            leagueEl.clearValidators();
            leagueEl.reset('');
            divisionEl.clearValidators();
            divisionEl.reset('');
          } else if (leagueNameEl.value === null && leagueEl.value === null) {
            leagueEl.setValidators(Validators.required);
            divisionEl.setValidators(Validators.required);
          }
        }
      );
  }

  save() {
    if (this.teamForm.dirty && this.teamForm.valid) {
      if (this.selectedTeam.id) {
        let team = Object.assign({}, this.selectedTeam, {teamName: this.teamForm.value.teamName});
        this.saved.emit(team);
      } else {
        let newTeam: Team = {
          leagueId: this.teamForm.value.league.id,
          leagueName: this.teamForm.value.league.leagueName,
          divisionId: this.teamForm.value.division.id,
          divisionName: this.teamForm.value.division.divisionName,
          teamName: this.teamForm.value.teamName
        };
        this.saved.emit(newTeam);
      }
      this.resetValues();
    }
  }

  cancel() {
    this.resetValues();
    this.cancelled.emit();
  }

  resetValues() {
    this.teamForm.reset();
  }

}
