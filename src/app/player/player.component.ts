import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Player } from './shared/player.model';
import { PlayerService } from './shared/player.service';

@Component({
  selector: 'lms-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  players$: Observable<Player[]>;
  selectedPlayer: Player;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.players$ = this.playerService.players$;
    this.playerService.getAllPlayers();
  }

  resetPlayer() {
    let emptyPlayer: Player = {
      id: null,
      playerName: '',
      leagueId: null,
      leagueName: '',
      divisionId: null,
      divisionName: '',
      teamId: null,
      teamName: ''
    };
    this.selectedPlayer = emptyPlayer;
  }

  selectPlayer(player: Player) {
    this.selectedPlayer = player;
  }

  savePlayer(player: Player) {
    this.playerService.savePlayer(player);
    this.resetPlayer();
  }

  deletePlayer(player: Player) {
    this.playerService.deletePlayer(player);
    this.resetPlayer();
  }

}
