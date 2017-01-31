import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Season } from '../shared/season.model';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';
import { Player } from '../../player/shared/player.model';
import { PlayerService } from '../../player/shared/player.service';

@Component({
  selector: 'lms-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonDetailComponent implements OnInit {

  seasonForm: FormGroup;
  originalName: string;
  selectedSeason: Season;
  leagues$: Observable<League[]> = this.leagueService.leagues$;
  divisions$: Observable<Division[]> = this.divisionService.divisions$;
  teams$: Observable<Team[]> = this.teamService.teams$;
  players$: Observable<Player[]> = this.playerService.players$;
  league = { leagueId: null };
  division = { divisionId: null };
  team = { teamId: null };

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set season(value: Season) {
    if (value) {
      this.originalName = value.seasonName;
      this.seasonForm.patchValue({
        leagueName: value.leagueName,
        divisionName: value.divisionName,
        teamName: value.teamName,
        playerName: value.playerName,
        seasonName: value.seasonName
      });
    }
    this.selectedSeason = Object.assign({}, value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private teamService: TeamService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {;
    this.leagueService.getAllLeagues();
    this.divisionService.getAllDivisions();
    this.teamService.getAllTeams();
    this.playerService.getAllPlayers();

    this.seasonForm = this.formBuilder.group({
      'leagueName': {value: null, disabled: true},
      'league': [null, Validators.required],
      'divisionName': {value: null, disabled: true},
      'division': [null, Validators.required],
      'teamName': {value: null, disabled: true},
      'team': [null, Validators.required],
      'playerName': {value: null, disabled: true},
      'player': [null, Validators.required],
      'seasonName': [null, Validators.required]
    });

    let leagueNameEl = this.seasonForm.get('leagueName');
    let leagueEl = this.seasonForm.get('league');
    let divisionNameEl = this.seasonForm.get('divisionName');
    let divisionEl = this.seasonForm.get('division');
    let teamNameEl = this.seasonForm.get('teamName');
    let teamEl = this.seasonForm.get('team');
    let playerNameEl = this.seasonForm.get('playerName');
    let playerEl = this.seasonForm.get('player');
    let seasonNameEl = this.seasonForm.get('seasonName');

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

    teamEl.valueChanges
      .subscribe(
        (team) => {
          if (teamEl.value !== null) {
            this.team = { teamId: team.id };
            playerEl.reset(null);
          }
        }
      );

    seasonNameEl.valueChanges
      .subscribe(
        (value) => {
          if (leagueNameEl.value !== null && leagueEl.value === null) {
            leagueEl.clearValidators();
            leagueEl.reset('');
            divisionEl.clearValidators();
            divisionEl.reset('');
            teamEl.clearValidators();
            teamEl.reset('');
            playerEl.clearValidators();
            playerEl.reset('');
          } else if (leagueNameEl.value === null && leagueEl.value === null) {
            leagueEl.setValidators(Validators.required);
            divisionEl.setValidators(Validators.required);
            teamEl.setValidators(Validators.required);
            playerEl.setValidators(Validators.required);
          }
        }
      );
  }

  save() {
    if (this.seasonForm.dirty && this.seasonForm.valid) {
      if (this.selectedSeason.id) {
        let season = Object.assign({}, this.selectedSeason, {seasonName: this.seasonForm.value.seasonName});
        this.saved.emit(season);
      } else {
        let newSeason: Season = {
          leagueId: this.seasonForm.value.league.id,
          leagueName: this.seasonForm.value.league.leagueName,
          divisionId: this.seasonForm.value.division.id,
          divisionName: this.seasonForm.value.division.divisionName,
          teamId: this.seasonForm.value.team.id,
          teamName: this.seasonForm.value.team.teamName,
          playerId: this.seasonForm.value.player.id,
          playerName: this.seasonForm.value.player.playerName,
          seasonName: this.seasonForm.value.seasonName
        };
        this.saved.emit(newSeason);
      }
      this.resetValues();
    }
  }

  cancel() {
    this.resetValues();
    this.cancelled.emit();
  }

  resetValues() {
    this.seasonForm.reset();
  }

}
