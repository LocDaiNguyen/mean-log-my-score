import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Player } from '../shared/player.model';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';

@Component({
  selector: 'lms-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailComponent implements OnInit {

  playerForm: FormGroup;
  originalName: string;
  selectedLeague: League;
  selectedDivision: Division;
  selectedPlayer: Player;
  selectedTeam: Team;
  leagues$: Observable<League[]> = this.leagueService.leagues$;
  divisions$: Observable<Division[]> = this.divisionService.divisions$;
  teams$: Observable<Team[]> = this.teamService.teams$;
  league = { leagueId: null };
  division = { divisionId: null };

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set player(value: Player) {
    if (value) {
      this.originalName = value.playerName;
      this.playerForm.patchValue({
        leagueName: value.leagueName,
        divisionName: value.divisionName,
        teamName: value.teamName,
        playerName: value.playerName
      });
    }
    this.selectedPlayer = Object.assign({}, value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private teamService: TeamService
  ) { }

  ngOnInit() {;
    this.leagueService.getAllLeagues();
    this.divisionService.getAllDivisions();
    this.teamService.getAllTeams();

    this.playerForm = this.formBuilder.group({
      'leagueName': {value: null, disabled: true},
      'league': [null, Validators.required],
      'divisionName': {value: null, disabled: true},
      'division': [null, Validators.required],
      'teamName': {value: null, disabled: true},
      'team': [null, Validators.required],
      'playerName': [null, Validators.required]
    });

    let leagueNameEl = this.playerForm.get('leagueName');
    let leagueEl = this.playerForm.get('league');
    let divisionNameEl = this.playerForm.get('divisionName');
    let divisionEl = this.playerForm.get('division');
    let teamNameEl = this.playerForm.get('teamName');
    let teamEl = this.playerForm.get('team');
    let playerNameEl = this.playerForm.get('playerName');

    leagueEl.valueChanges
      .subscribe(
        (league) => {
          if (leagueEl.value !== null) {
            this.league = { leagueId: league.id };
            divisionEl.reset(null);
          }
        }
      );

    divisionEl.valueChanges
      .subscribe(
        (division) => {
          if (divisionEl.value !== null) {
            this.division = { divisionId: division.id };
            teamEl.reset(null);
          }
        }
      );

    playerNameEl.valueChanges
      .subscribe(
        (value) => {
          if (leagueNameEl.value !== null && leagueEl.value === null) {
            leagueEl.clearValidators();
            leagueEl.reset('');
            divisionEl.clearValidators();
            divisionEl.reset('');
            teamEl.clearValidators();
            teamEl.reset('');
          } else if (leagueNameEl.value === null && leagueEl.value === null) {
            leagueEl.setValidators(Validators.required);
            divisionEl.setValidators(Validators.required);
            teamEl.setValidators(Validators.required);
          }
        }
      );
  }

  save() {
    if (this.playerForm.dirty && this.playerForm.valid) {
      if (this.selectedPlayer.id) {
        let player = Object.assign({}, this.selectedPlayer, {playerName: this.playerForm.value.playerName});
        this.saved.emit(player);
      } else {
        let newPlayer: Player = {
          playerName: this.playerForm.value.playerName,
          leagueId: this.playerForm.value.league.id,
          leagueName: this.playerForm.value.league.leagueName,
          divisionId: this.playerForm.value.division.id,
          divisionName: this.playerForm.value.division.divisionName,
          teamId: this.playerForm.value.team.id,
          teamName: this.playerForm.value.team.teamName
        };
        this.saved.emit(newPlayer);
      }
      this.resetValues();
    }
  }

  cancel(player: Player) {
    this.resetValues();
    this.cancelled.emit(player);
  }

  resetValues() {
    this.playerForm.reset();
  }

}
