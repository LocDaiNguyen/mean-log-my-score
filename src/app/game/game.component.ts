import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Game } from './shared/game.model';
import { GameService } from './shared/game.service';

@Component({
  selector: 'lms-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  games$: Observable<Game[]>;
  selectedGame: Game;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.games$ = this.gameService.games$;
    this.gameService.getAllGames();
  }

  resetGame() {
    let emptyGame: Game = {
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
      gameType: ''
    };
    this.selectedGame = emptyGame;
  }

  selectGame(game: Game) {
    this.selectedGame = game;
  }

  saveGame(game: Game) {
    this.gameService.saveGame(game);
    this.resetGame();
  }

  deleteGame(game: Game) {
    this.gameService.deleteGame(game);
    this.resetGame();
  }

}
