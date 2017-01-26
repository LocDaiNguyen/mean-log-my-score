import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

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

  originalName: string;
  gameName: string;
  games$: Observable<Game[]> = this.gameService.games$;
  players$: Observable<Player[]> = this.playerService.players$;
  selectedScore: Score;
  selectedGame: Game;
  selectedGoalScorer: Player;
  selectedAssistorOne: Player;
  selectedAssistorTwo: Player;
  team = { teamId: null };
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
            let game = games.find(game => game.id === value.gameId);
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
      this.team = { teamId: value.teamId };
    }
    this.selectedScore = Object.assign({}, value);
  }

  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.playerService.getAllPlayers();
    this.gameService.getAllGames();
  }

  save(form: NgForm) {
    if (this.selectedScore.id) {
      return this.saved.emit(this.selectedScore);
    }
    let newScore: Score = {
      leagueId: form.value.game.leagueId,
      leagueName: form.value.game.leagueName,
      divisionId: form.value.game.divisionId,
      divisionName: form.value.game.divisionName,
      teamId: form.value.game.teamId,
      teamName: form.value.game.teamName,
      playerId: form.value.game.playerId,
      playerName: form.value.game.playerName,
      seasonId: form.value.game.seasonId,
      seasonName: form.value.game.seasonName,
      opponentId: form.value.game.opponentId,
      opponentName: form.value.game.opponentName,
      date: form.value.game.date,
      time: form.value.game.time,
      gameType: form.value.game.gameType,
      gameId: form.value.game.gameId,
      scoreType: form.value.scoreType,
      situation: form.value.situation,
      period: form.value.period,
      scoreTime: form.value.scoreTime,
      goalScorerId: form.value.goalScorer.id,
      goalScorerName: form.value.goalScorer.playerName,
      assistorOneId: form.value.assistorOne.id,
      assistorOneName: form.value.assistorOne.playerName,
      assistorTwoId: form.value.assistorTwo.id,
      assistorTwoName: form.value.assistorTwo.playerName
    };
    this.saved.emit(newScore);
    this.resetValues();
  }

  cancel(score: Score) {
    this.resetValues();
    this.cancelled.emit(score);
  }

  resetValues() {
    this.selectedScore = {
      id: null,
      leagueId: null,
      leagueName: '',
      divisionId: null,
      divisionName: '',
      teamId: null,
      teamName: '',
      playerId: null,
      playerName: '',
      seasonId: null,
      seasonName: '',
      opponentId: null,
      opponentName: '',
      date: '',
      time: '',
      gameType: '',
      gameId: null,
      scoreType: '',
      situation: '',
      period: '',
      scoreTime: '',
      goalScorerId: null,
      goalScorerName: '',
      assistorOneId: null,
      assistorOneName: '',
      assistorTwoId: null,
      assistorTwoName: ''
    };
    this.selectedGame = {
      id: null,
      leagueId: null,
      leagueName: '',
      divisionId: null,
      divisionName: '',
      teamId: null,
      teamName: '',
      playerId: null,
      playerName: '',
      seasonId: null,
      seasonName: '',
      opponentId: null,
      opponentName: '',
      date: '',
      time: '',
      gameType: '',
    };
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

  onChangeGame(game: Game) {
    this.team = { teamId: game.teamId };
  }

  onChangeGoalScorer(goalScorer: Player) {
    this.selectedScore.goalScorerId = goalScorer.id;
    this.selectedScore.goalScorerName = goalScorer.playerName;
  }

  onChangeAssistorOne(assistorOne: Player) {
    this.selectedScore.assistorOneId = assistorOne.id;
    this.selectedScore.assistorOneName = assistorOne.playerName;
  }

  onChangeAssistorTwo(assistorTwo: Player) {
    this.selectedScore.assistorTwoId = assistorTwo.id;
    this.selectedScore.assistorTwoName = assistorTwo.playerName;
  }

}
