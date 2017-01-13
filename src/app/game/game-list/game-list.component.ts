import { Component, OnInit } from '@angular/core';

import { Game } from '../shared/game.model';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'lms-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  error: string;
  games: Game[];
  noGames: boolean;

  constructor(private gameService: GameService) { }

  getAllGames(): void {
    this.gameService.getAllGames()
      .subscribe(
        (games: Game[]) => {
          this.games = games;
          this.setNoGames(games);
        },
        (error: string) => { this.error = error; }
      );
  }

  setNoGames(games: Game[]): void {
    if (games.length > 0) {
      this.noGames = false;
    } else {
      this.noGames = true;
    }
  }

  ngOnInit(): void {
    this.getAllGames();
  }

}
