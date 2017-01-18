import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Game } from '../shared/game.model';
import { GameService } from '../shared/game.service';
import { Season } from '../../season/shared/season.model';
import { SeasonService } from '../../season/shared/season.service';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';

@Component({
  selector: 'lms-game-new',
  templateUrl: './game-new.component.html',
  styleUrls: ['./game-new.component.css']
})
export class GameNewComponent implements OnInit {

  error: string;
  games: Game[];
  seasons: Season[];
  teams: Team[];
  divisionId = {};
  gameTypes: Array<string>;

  constructor(
    private gameService: GameService,
    private seasonService: SeasonService,
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  createGame(form: NgForm): '' | void {

    let newGame = new Game(
      form.value.seasonSelected.leagueId,
      form.value.seasonSelected.leagueName,
      form.value.seasonSelected.divisionId,
      form.value.seasonSelected.divisionName,
      form.value.seasonSelected.teamId,
      form.value.seasonSelected.teamName,
      form.value.seasonSelected.playerId,
      form.value.seasonSelected.playerName,
      form.value.seasonSelected.seasonId,
      form.value.seasonSelected.seasonName,
      form.value.teamSelected.id,
      form.value.teamSelected.teamName,
      form.value.date,
      form.value.time,
      form.value.gameType
    )

    if (!newGame) { return; }

    this.gameService.createGame(newGame)
      .subscribe(
        (game: Game) => { this.games.push(game); },
        (error: string) => { this.error = error; }
      );

    this.goBack();
  }

  getAllGames(): void {
    this.gameService.getAllGames()
      .subscribe(
        (games: Game[]) => { this.games = games; },
        (error: string) => { this.error = error; }
      );
  }

  getAllSeasons(): void {
    this.seasonService.getAllSeasons()
      .subscribe(
        (seasons: Season[]) => { this.seasons = seasons; },
        (error: string) => { this.error = error; }
      );
  }

  getAllTeams(): void {
    this.teamService.getAllTeams()
      .subscribe(
        (teams: Team[]) => { this.teams = teams; },
        (error: string) => { this.error = error; }
      )
  }

  onChangeSeason(season: Season): void {
    this.divisionId = { divisionId: season.divisionId };
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.getAllGames();
    this.getAllSeasons();
    this.getAllTeams();
    this.gameTypes = ['Recreation', 'Regular', 'Playoffs', 'Championship'];
  }

}
