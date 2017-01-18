import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Score } from '../shared/score.model';
import { ScoreService } from '../shared/score.service';
import { Game } from '../../game/shared/game.model';
import { GameService } from '../../game/shared/game.service';
import { Player } from '../../player/shared/player.model';
import { PlayerService } from '../../player/shared/player.service';

@Component({
  selector: 'lms-score-update',
  templateUrl: './score-update.component.html',
  styleUrls: ['./score-update.component.css']
})
export class ScoreUpdateComponent implements OnInit {

  error: string;
  games: Game[];
  gameSelected: Game;
  players: Player[];
  goalScorer: Player;
  assistorOne: Player;
  assistorTwo: Player;
  teamId = {};
  scoreTypes: Array<string>
  scoreType: string;
  situations: Array<string>;
  situation: string;
  periods: Array<string>;
  period: string;
  scoreTime: string;
  score: Score;

  constructor(
    private scoreService: ScoreService,
    private gameService: GameService,
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  updateScore(): void {
    this.score.goalScorerId = this.goalScorer.id;
    this.score.goalScorerName = this.goalScorer.playerName;
    this.score.assistorOneId = this.assistorOne.id;
    this.score.assistorOneName = this.assistorOne.playerName;
    this.score.assistorTwoId = this.assistorTwo.id;
    this.score.assistorTwoName = this.assistorTwo.playerName;
    this.scoreService.updateScore(this.score)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  deleteScore(id: any): void {
    this.scoreService.deleteScore(id)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  getAllGames(score: Score): void {
    this.gameService.getAllGames()
      .subscribe(
        (games: Game[]) => {
          this.games = games;
          this.gameSelected = games.find((game: Game) => { return game.id === score.gameId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  getAllPlayers(score: Score): void {
    this.playerService.getAllPlayers()
      .subscribe(
        (players: Player[]) => {
          this.players = players;
          this.goalScorer = players.find((player: Player) => { return player.id === score.goalScorerId; });
          this.assistorOne = players.find((player: Player) => { return player.id === score.assistorOneId; });
          this.assistorTwo = players.find((player: Player) => { return player.id === score.assistorTwoId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.scoreService.getScore(+params['id']))
      .subscribe(
        (score: Score) => {
          this.score = score;
          this.getAllGames(score);
          this.getAllPlayers(score);
          this.teamId = { teamId: score.teamId };
        },
        (error: string) => { this.error = error; }
      );
    this.scoreTypes = ['Goal', 'Assist'];
    this.situations = ['Even Strength', 'Power Play', 'Short Handed'];
    this.periods = ['1st', '2nd', '3rd', 'OT', 'Shootout'];
  }

}
