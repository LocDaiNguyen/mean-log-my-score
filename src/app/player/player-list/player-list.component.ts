import { Component, OnInit } from '@angular/core';

import { Player } from '../shared/player.model';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'lms-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  error: string;
  players: Player[];
  noPlayers: boolean;

  constructor(
    private playerService: PlayerService
  ) { }

  getAllPlayers(): void {
    this.playerService.getAllPlayers()
      .subscribe(
        (players: Player[]) => { 
          this.players = players;
          this.setNoPlayers(players);
        },
        (error: string) => { this.error = error; }
      );
  }

  setNoPlayers(players: Player[]): void {
    if (players.length > 0) {
      this.noPlayers = false;
    } else {
      this.noPlayers = true;
    }
  }

  ngOnInit(): void {
    this.getAllPlayers();
  }

}
