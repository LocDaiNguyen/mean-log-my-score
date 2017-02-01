import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Game } from '../shared/game.model';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';
import { Season } from '../../season/shared/season.model';
import { SeasonService } from '../../season/shared/season.service';

@Component({
  selector: 'lms-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailComponent implements OnInit {

  gameForm: FormGroup;
  originalName: string;
  selectedGame: Game;
  selectedOpponent: Team;
  seasons$: Observable<Season[]> = this.seasonService.seasons$;
  teams$: Observable<Team[]> = this.teamService.teams$;
  division = { divisionId: null };
  team = { id: null };
  gameTypes: Array<string> = ['Recreation', 'Regular', 'Playoffs', 'Championship'];

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set game(value: Game) {
    if (value) {
      this.originalName = `${value.teamName} vs ${value.opponentName}`;
      this.teams$
        .subscribe(
          opponents => {
            let opp = opponents.find(opponent => opponent.id === value.opponentId);
            this.selectedOpponent = opp;
          }
        );
      this.gameForm.patchValue({
        seasonName: value.seasonName,
        gameInfo: {
          opponent: this.selectedOpponent,
          date: value.date,
          time: value.time,
          gameType: value.gameType
        }
      });
      this.division = { divisionId: value.divisionId };
      this.team = { id: value.teamId };
    }
    this.selectedGame = Object.assign({}, value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private seasonService: SeasonService
  ) { }

  ngOnInit() {
    this.teamService.getAllTeams();
    this.seasonService.getAllSeasons();

    this.gameForm = this.formBuilder.group({
      'seasonName': {value: null, disabled: true},
      'season': [null, Validators.required],
      'gameInfo': this.formBuilder.group({
        // 'opponentName': {value: null, disabled: true},
        'opponent': [null, Validators.required],
        'date': [null, Validators.required],
        'time': [null, Validators.required],
        'gameType': [null, Validators.required]
      })
    });

    let seasonNameEl = this.gameForm.get('seasonName');
    let seasonEl = this.gameForm.get('season');
    let gameInfoEl = this.gameForm.get('gameInfo');
    // let opponentNameEl = this.gameForm.get('gameInfo').get('opponentName');
    let opponentEl = this.gameForm.get('gameInfo').get('opponent');
    let dateEl = this.gameForm.get('gameInfo').get('date');
    let timeEl = this.gameForm.get('gameInfo').get('time');
    let gameTypeEl = this.gameForm.get('gameInfo').get('gameType');

    seasonEl.valueChanges
      .subscribe(
        (season) => {
          if (seasonEl.value !== null) {
            this.division = { divisionId: season.divisionId };
            this.team = { id: season.teamId };
            opponentEl.reset(null);
          }
        }
      );

    gameInfoEl.valueChanges
      .subscribe(
        (value) => {
          if (seasonNameEl.value !== null && seasonEl.value === null) {
            seasonEl.clearValidators();
            seasonEl.reset('');
          } else if (seasonNameEl.value === null && seasonEl.value === null) {
            seasonEl.setValidators(Validators.required);
          }
        }
      );
  }

  save() {
    if (this.gameForm.dirty && this.gameForm.valid) {
      if (this.selectedGame.id) {
        let game = Object.assign(
          {},
          this.selectedGame,
          {opponentId: this.gameForm.value.gameInfo.opponent.id},
          {opponentName: this.gameForm.value.gameInfo.opponent.teamName},
          {date: this.gameForm.value.gameInfo.date},
          {time: this.gameForm.value.gameInfo.time},
          {gameType: this.gameForm.value.gameInfo.gameType},
        );
        this.saved.emit(game);
      } else {
        let newGame: Game = {
          leagueId: this.gameForm.value.season.leagueId,
          leagueName: this.gameForm.value.season.leagueName,
          divisionId: this.gameForm.value.season.divisionId,
          divisionName: this.gameForm.value.season.divisionName,
          teamId: this.gameForm.value.season.teamId,
          teamName: this.gameForm.value.season.teamName,
          playerId: this.gameForm.value.season.playerId,
          playerName: this.gameForm.value.season.playerName,
          seasonId: this.gameForm.value.season.seasonId,
          seasonName: this.gameForm.value.season.seasonName,
          opponentId: this.gameForm.value.gameInfo.opponent.id,
          opponentName: this.gameForm.value.gameInfo.opponent.teamName,
          date: this.gameForm.value.gameInfo.date,
          time: this.gameForm.value.gameInfo.time,
          gameType: this.gameForm.value.gameInfo.gameType
        };
        this.saved.emit(newGame);
      }
    }
    this.resetValues();
  }

  cancel() {
    this.resetValues();
    this.cancelled.emit();
  }

  resetValues() {
    this.gameForm.reset();
  }
}
