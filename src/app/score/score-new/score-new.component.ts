import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Score } from '../shared/score.model';
import { ScoreService } from '../shared/score.service';
import { Game } from '../../game/shared/game.model';
import { GameService } from '../../game/shared/game.service';
import { Player } from '../../player/shared/player.model';
import { PlayerService } from '../../player/shared/player.service';

@Component({
  selector: 'lms-score-new',
  templateUrl: './score-new.component.html',
  styleUrls: ['./score-new.component.css']
})
export class ScoreNewComponent implements OnInit {

  error: string;
  scores: Score[];
  games: Game[];
  players: Player[];
  teamId = {};
  scoreTypes: Array<string>
  scoreType: string;
  situations: Array<string>;
  situation: string;
  periods: Array<string>;
  period: string;
  scoreTime: string;

  constructor(
    private scoreService: ScoreService,
    private gameService: GameService,
    private playerService: PlayerService,
    private router: Router
  ) { }

  createScore(form: NgForm): '' | void {

    let newScore = new Score(
      form.value.gameSelected.leagueId,
      form.value.gameSelected.leagueName,
      form.value.gameSelected.divisionId,
      form.value.gameSelected.divisionName,
      form.value.gameSelected.teamId,
      form.value.gameSelected.teamName,
      form.value.gameSelected.playerId,
      form.value.gameSelected.playerName,
      form.value.gameSelected.seasonId,
      form.value.gameSelected.seasonName,
      form.value.gameSelected.opponentId,
      form.value.gameSelected.opponentName,
      form.value.gameSelected.date,
      form.value.gameSelected.time,
      form.value.gameSelected.gameType,
      form.value.gameSelected.gameId,
      form.value.scoreType,
      form.value.situation,
      form.value.period,
      form.value.scoreTime,
      form.value.goalScorerId,
      form.value.goalScorerName,
      form.value.assistorOneId,
      form.value.assistorOneName,
      form.value.assistorTwoId,
      form.value.assistorTwoName,
    )

    if (!newScore) { return; }

    this.scoreService.createScore(newScore)
      .subscribe(
        (score: Score) => { this.scores.push(score); },
        (error: string) => { this.error = error; }
      );

    this.goBack();
  }

  getAllScores(): void {
    this.scoreService.getAllScores()
      .subscribe(
        (scores: Score[]) => { this.scores = scores; },
        (error: string) => { this.error = error; }
      )
  }

  getAllGames(): void {
    this.gameService.getAllGames()
      .subscribe(
        (games: Game[]) => { this.games = games; },
        (error: string) => { this.error = error; }
      );
  }

  getAllPlayers(): void {
    this.playerService.getAllPlayers()
      .subscribe(
        (players: Player[]) => { this.players = players; },
        (error: string) => { this.error = error; }
      );
  }

  onChangeGame(game: Game): void {
    this.teamId = { teamId: game.teamId };
  }

  goBack(): void {
    this.router.navigate(['/scores']);
  }

  ngOnInit(): void {
    this.getAllScores()
    this.getAllGames();
    this.getAllPlayers();
    this.scoreTypes = ['Goal', 'Assist'];
    this.scoreType = 'Goal'
    this.situations = ['Even Strength', 'Power Play', 'Short Handed'];
    this.situation = 'Even Strength';
    this.periods = ['1st', '2nd', '3rd', 'OT', 'Shootout'];
    this.period = '1st';
  }

}
