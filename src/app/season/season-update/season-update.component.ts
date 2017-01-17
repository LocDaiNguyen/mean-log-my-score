import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Season } from '../shared/season.model';
import { SeasonService } from '../shared/season.service';
import { Player } from '../../player/shared/player.model';
import { PlayerService } from '../../player/shared/player.service';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';

@Component({
  selector: 'lms-season-update',
  templateUrl: './season-update.component.html',
  styleUrls: ['./season-update.component.css']
})
export class SeasonUpdateComponent implements OnInit {

  error: string;
  leagueId = {};
  leagues: League[];
  leagueSelected: League;
  divisionId = {};
  divisions: Division[];
  divisionSelected: Division;
  teamId = {};
  teams: Team[];
  teamSelected: Team;
  players: Player[];
  playerSelected: Player;
  season: Season;

  constructor(
    private seasonService: SeasonService,
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private teamService: TeamService,
    private playerService: PlayerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  updateSeason(): void {
    this.seasonService.updateSeason(this.season)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  deleteSeason(id: any): void {
    this.seasonService.deleteSeason(id)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      )
  }

  getAllLeagues(season: Season): void {
    this.leagueService.getAllLeagues()
      .subscribe(
        (leagues: League[]) => {
          this.leagues = leagues;
          this.leagueSelected = leagues.find((league: League) => { return league.id === season.leagueId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  getAllDivisions(season: Season): void {
    this.divisionService.getAllDivisions()
      .subscribe(
        (divisions: Division[]) => {
          this.divisions = divisions;
          this.divisionSelected = divisions.find((division: Division) => { return division.id === season.divisionId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  getAllTeams(season: Season): void {
    this.teamService.getAllTeams()
      .subscribe(
        (teams: Team[]) => {
          this.teams = teams;
          this.teamSelected = teams.find((team: Team) => { return team.id === season.teamId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  getAllPlayers(season: Season): void {
    this.playerService.getAllPlayers()
      .subscribe(
        (players: Player[]) => {
          this.players = players;
          this.playerSelected = players.find((player: Player) => { return player.id === season.playerId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  onChangeLeague(league: League): void {
    this.leagueId = { leagueId: league.id };
    this.season.leagueId = league.id;
    this.season.leagueName = league.leagueName;
  }

  onChangeDivision(division: Division): void {
    this.divisionId = { divisionId: division.id };
    this.season.divisionId = division.id;
    this.season.divisionName = division.divisionName;
  }

  onChangeTeam(team: Team): void {
    this.teamId = { teamId: team.id };
    this.season.teamId = team.id;
    this.season.teamName = team.teamName;
  }

  onChangePlayer(player: Player): void {
    this.season.playerId = player.id;
    this.season.playerName = player.playerName;
  }

  goBack(): void {
    this.router.navigate(['/seasons']);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .switchMap((params: Params) => this.seasonService.getSeason(+params['id']))
      .subscribe(
        (season: Season) => {
          this.season = season;
          this.getAllLeagues(season);
          this.getAllDivisions(season);
          this.getAllTeams(season);
          this.getAllPlayers(season);
          this.leagueId = { leagueId: season.leagueId };
          this.divisionId = { divisionId: season.divisionId };
          this.teamId = { teamId: season.playerId };
      },
      (error: string) => { this.error = error; }
    );
  }

}
