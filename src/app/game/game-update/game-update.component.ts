import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';

import { Game } from '../shared/game.model';
import { GameService } from '../shared/game.service';
import { Season } from '../../season/shared/season.model';
import { SeasonService } from '../../season/shared/season.service';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';

@Component({
  selector: 'lms-game-update',
  templateUrl: './game-update.component.html',
  styleUrls: ['./game-update.component.css']
})
export class GameUpdateComponent implements OnInit {

  error: string;
  seasons: Season[];
  seasonSelected: Season;
  teams: Team[];
  teamSelected: Team;
  divisionId = {};
  date: string;
  time: string;
  gameTypes: Array<string>;
  game: Game;

  constructor(
    private gameService: GameService,
    private seasonService: SeasonService,
    private teamService: TeamService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  updateGame(): void {
    this.gameService.updateGame(this.game)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  deleteGame(id: any): void {
    this.gameService.deleteGame(id)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  getAllSeasons(game: Game): void {
    this.seasonService.getAllSeasons()
      .subscribe(
        (seasons: Season[]) => {
          this.seasons = seasons;
          this.seasonSelected = _.find(seasons, (season: Season) => { return season.id === game.seasonId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  getAllTeams(game: Game): void {
    this.teamService.getAllTeams()
      .subscribe(
        (teams: Team[]) => {
          this.teams = teams;
          this.teamSelected = _.find(teams, (team: Team) => { return team.id === game.teamId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  goBack(): void {
    this.router.navigate(['/games']);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .switchMap((params: Params) => this.gameService.getGame(+params['id']))
      .subscribe(
        (game: Game) => {
          console.log(game);
          this.game = game;
          this.getAllSeasons(game);
          this.getAllTeams(game);
          this.divisionId = { divisionId: game.divisionId };
        },
        (error: string) => { this.error = error; }
      );
    this.gameTypes = ['Recreation', 'Regular', 'Playoffs', 'Championship'];
  }

}
