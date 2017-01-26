import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

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

  originalName: string;
  selectedGame: Game;
  seasons$: Observable<Season[]> = this.seasonService.seasons$;
  teams$: Observable<Team[]> = this.teamService.teams$;
  selectedSeason: Season;
  selectedOpponent: Team;
  opponents: Team[];
  division = { divisionId: null };
  gameTypes: Array<string> = ['Recreation', 'Regular', 'Playoffs', 'Championship'];

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set game(value: Game) {
    console.log(value);
    if (value) {
      this.originalName = `${value.teamName} vs ${value.opponentName}`;
      this.teams$
        .subscribe(
          opponents => {
            let opps = opponents.filter(opponent => opponent.id !== value.teamId);
            let opp = opponents.find(opponent => opponent.id === value.opponentId);
            this.opponents = opps;
            this.selectedOpponent = opp;
          }
      );
      this.division = { divisionId: value.divisionId };
    }
    this.selectedGame = Object.assign({}, value);
  }

  constructor(
    private teamService: TeamService,
    private seasonService: SeasonService
  ) { }

  ngOnInit() {
    this.teamService.getAllTeams();
    this.seasonService.getAllSeasons();
    this.teams$
      .subscribe(
        opponents => this.opponents = opponents
    );
  }

  save(form: NgForm) {
    if (this.selectedGame.id) {
      return this.saved.emit(this.selectedGame);
    }
    let newGame: Game = {
      leagueId: form.value.season.leagueId,
      leagueName: form.value.season.leagueName,
      divisionId: form.value.season.id,
      divisionName: form.value.season.divisionName,
      teamId: form.value.season.id,
      teamName: form.value.season.teamName,
      playerId: form.value.season.id,
      playerName: form.value.season.playerName,
      seasonId: form.value.season.id,
      seasonName: form.value.season.seasonName,
      opponentId: form.value.opponent.id,
      opponentName: form.value.opponent.teamName,
      date: form.value.date,
      time: form.value.time,
      gameType: form.value.gameType
    };
    this.saved.emit(newGame);
    this.resetValues();
  }

  cancel(game: Game) {
    this.resetValues();
    this.cancelled.emit(game);
  }

  resetValues() {
    this.selectedSeason = {
      id: null,
      seasonName: '',
      divisionId: null,
      divisionName: '',
      leagueId: null,
      leagueName: '',
      teamId: null,
      teamName: '',
      playerId: null,
      playerName: ''
    };
  }

  onChangeSeason(season: Season) {
    this.teams$
      .subscribe(
        opponents => {
          this.opponents = opponents.filter(opponent => opponent.id !== season.teamId);
        }
    );
    this.division = { divisionId: season.divisionId };
  }

  onChangeOpponent(opponent: Team) {
    this.selectedGame.opponentId = opponent.id;
    this.selectedGame.opponentName = opponent.teamName;
  }

}
