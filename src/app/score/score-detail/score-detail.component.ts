import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Score } from '../shared/score.model';
import { Player } from '../../player/shared/player.model';
import { PlayerService } from '../../player/shared/player.service';
import { Game } from '../../game/shared/game.model';
import { GameService } from '../../game/shared/game.service';

@Component({
  selector: 'lms-score-detail',
  templateUrl: './score-detail.component.html',
  styleUrls: ['./score-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreDetailComponent implements OnInit {

  scoreForm: FormGroup;
  originalName: string;
  gameName: string;
  selectedScore: Score;
  selectedGame: Game;
  selectedGoalScorer: Player;
  selectedAssistorOne: Player;
  selectedAssistorTwo: Player;
  games$: Observable<Game[]> = this.gameService.games$;
  players$: Observable<Player[]> = this.playerService.players$;
  team = { teamId: null };
  scorer = { id: null};
  assistorOne = { id: null };
  assistorTwo = { id: null };
  scoreTypes: Array<string> = ['Goal', 'Assist'];
  situations: Array<string> = ['Even Strength', 'Power Play', 'Short Handed'];
  periods: Array<string> = ['1st', '2nd', '3rd', 'OT', 'Shootout'];

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set score(value: Score) {
    if (value) {
      this.originalName = `${value.teamName} vs ${value.opponentName}`;
      this.gameName = `${value.teamName} vs ${value.opponentName} on ${value.date}`;
      this.games$
        .subscribe(
          games => {
            let game = games.find(g => g.id === value.gameId);
            if (game) {
              this.selectedGame = game;
            }
          }
        );
      this.players$
        .subscribe(
          players => {
            let goalScorer = players.find(player => player.id === value.goalScorerId);
            let assistorOne = players.find(player => player.id === value.assistorOneId);
            let assistorTwo = players.find(player => player.id === value.assistorTwoId);
            if (goalScorer) {
              this.selectedGoalScorer = goalScorer;
            }
            if (assistorOne) {
              this.selectedAssistorOne = assistorOne;
            }
            if (assistorTwo) {
              this.selectedAssistorTwo = assistorTwo;
            }
          }
        );
      this.scoreForm.patchValue({
        gameName: value.seasonName,
        scoreInfo: {
          scoreType: value.scoreType,
          goalScorer: this.selectedGoalScorer,
          assistorOne: this.selectedAssistorOne,
          assistorTwo: this.selectedAssistorTwo,
          situation: value.situation,
          period: value.period,
          scoreTime: value.scoreTime
        }
      });
      this.team = { teamId: value.teamId };
      this.scorer = { id: value.goalScorerId };
      this.assistorOne = { id: value.assistorOneId };
      this.assistorTwo = { id: value.assistorTwoId };
    }
    this.selectedScore = Object.assign({}, value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.playerService.getAllPlayers();
    this.gameService.getAllGames();

    this.scoreForm = this.formBuilder.group({
      'gameName': {value: null, disabled: true},
      'game': [null, Validators.required],
      'scoreInfo': this.formBuilder.group({
        'scoreType': [null, Validators.required],
        'goalScorer': [null, Validators.required],
        'assistorOne': null,
        'assistorTwo': null,
        'situation': [null, Validators.required],
        'period': [null, Validators.required],
        'scoreTime': [null, Validators.required]
      })
    });

    let gameNameEl = this.scoreForm.get('gameName');
    let gameEl = this.scoreForm.get('game');
    let scoreInfoEl = this.scoreForm.get('scoreInfo');
    let scoreTypeEl = this.scoreForm.get('scoreInfo').get('scoreType');
    let goalScorerEl = this.scoreForm.get('scoreInfo').get('goalScorer');
    let assistorOneEl = this.scoreForm.get('scoreInfo').get('assistorOne');
    let assistorTwoEl = this.scoreForm.get('scoreInfo').get('assistorTwo');
    let situationEl = this.scoreForm.get('scoreInfo').get('situation');
    let periodEl = this.scoreForm.get('scoreInfo').get('period');
    let scoreTimeEl = this.scoreForm.get('scoreInfo').get('scoreTime');

    gameEl.valueChanges
      .subscribe(
        (game) => {
          if (gameEl.value !== null) {
            this.team = { teamId: game.teamId };
          }
        }
      );

    goalScorerEl.valueChanges
      .subscribe(
        (goalScorer) => {
          if (goalScorerEl.value !== null) {
            this.scorer = { id: goalScorer.id };
          }
        }
      );

    assistorOneEl.valueChanges
      .subscribe(
        (assistorOne) => {
          if (assistorOneEl.value !== null) {
            this.assistorOne = { id: assistorOne.id };
          }
        }
      );

    assistorTwoEl.valueChanges
      .subscribe(
        (assistorTwo) => {
          if (assistorTwoEl.value !== null) {
            this.assistorTwo = { id: assistorTwo.id };
          }
        }
      );

    scoreInfoEl.valueChanges
      .subscribe(
        (value) => {
          if (gameNameEl.value !== null && gameEl.value === null) {
            gameEl.clearValidators();
            gameEl.reset('');
          } else if (gameNameEl.value === null && gameEl.value === null) {
            gameEl.setValidators(Validators.required);
          }
        }
      );
  }

  save() {
    if (this.scoreForm.dirty && this.scoreForm.valid) {
      if (this.selectedScore.id) {
        let score = Object.assign(
          {},
          this.selectedScore,
          {scoreType: this.scoreForm.value.scoreInfo.scoreType},
          {situation: this.scoreForm.value.scoreInfo.situation},
          {period: this.scoreForm.value.scoreInfo.period},
          {scoreTime: this.scoreForm.value.scoreInfo.scoreTime},
          {goalScorerId: this.scoreForm.value.scoreInfo.goalScorer.id},
          {goalScorerName: this.scoreForm.value.scoreInfo.goalScorer.playerName},
          {assistorOneId: this.scoreForm.value.scoreInfo.assistorOne.id},
          {assistorOneName: this.scoreForm.value.scoreInfo.assistorOne.playerName},
          {assistorTwoId: this.scoreForm.value.scoreInfo.assistorTwo.id},
          {assistorTwoName: this.scoreForm.value.scoreInfo.assistorTwo.playerName},
        );
        this.saved.emit(score);
      } else {
        let newScore: Score = {
          leagueId: this.scoreForm.value.game.leagueId,
          leagueName: this.scoreForm.value.game.leagueName,
          divisionId: this.scoreForm.value.game.divisionId,
          divisionName: this.scoreForm.value.game.divisionName,
          teamId: this.scoreForm.value.game.teamId,
          teamName: this.scoreForm.value.game.teamName,
          playerId: this.scoreForm.value.game.playerId,
          playerName: this.scoreForm.value.game.playerName,
          seasonId: this.scoreForm.value.game.seasonId,
          seasonName: this.scoreForm.value.game.seasonName,
          opponentId: this.scoreForm.value.game.opponentId,
          opponentName: this.scoreForm.value.game.opponentName,
          date: this.scoreForm.value.game.date,
          time: this.scoreForm.value.game.time,
          gameType: this.scoreForm.value.game.gameType,
          gameId: this.scoreForm.value.game.gameId,
          scoreType: this.scoreForm.value.scoreInfo.scoreType,
          situation: this.scoreForm.value.scoreInfo.situation,
          period: this.scoreForm.value.scoreInfo.period,
          scoreTime: this.scoreForm.value.scoreInfo.scoreTime,
          goalScorerId: this.scoreForm.value.scoreInfo.goalScorer.id,
          goalScorerName: this.scoreForm.value.scoreInfo.goalScorer.playerName,
          assistorOneId: this.scoreForm.value.scoreInfo.assistorOne.id,
          assistorOneName: this.scoreForm.value.scoreInfo.assistorOne.playerName,
          assistorTwoId: this.scoreForm.value.scoreInfo.assistorTwo.id,
          assistorTwoName: this.scoreForm.value.scoreInfo.assistorTwo.playerName
        };
        this.saved.emit(newScore);
      }
    this.resetValues();
    }
  }

  cancel() {
    this.resetValues();
    this.cancelled.emit();
  }

  resetValues() {
    this.scoreForm.reset();
    this.selectedGoalScorer = {
      id: null,
      leagueId: null,
      leagueName: '',
      divisionId: null,
      divisionName: '',
      teamId: null,
      teamName: '',
      playerName: ''
    };
    this.selectedAssistorOne = {
      id: null,
      leagueId: null,
      leagueName: '',
      divisionId: null,
      divisionName: '',
      teamId: null,
      teamName: '',
      playerName: ''
    };
    this.selectedAssistorTwo = {
      id: null,
      leagueId: null,
      leagueName: '',
      divisionId: null,
      divisionName: '',
      teamId: null,
      teamName: '',
      playerName: ''
    };
    this.team = { teamId: null };
  }

  // onChangeGoalScorer(goalScorer: Player) {
  //   this.selectedScore.goalScorerId = goalScorer.id;
  //   this.selectedScore.goalScorerName = goalScorer.playerName;
  // }

  // onChangeAssistorOne(assistorOne: Player) {
  //   this.selectedScore.assistorOneId = assistorOne.id;
  //   this.selectedScore.assistorOneName = assistorOne.playerName;
  // }

  // onChangeAssistorTwo(assistorTwo: Player) {
  //   this.selectedScore.assistorTwoId = assistorTwo.id;
  //   this.selectedScore.assistorTwoName = assistorTwo.playerName;
  // }

}
