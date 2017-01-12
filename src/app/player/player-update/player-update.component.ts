import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';

import { Player } from '../shared/player.model';
import { PlayerService } from '../shared/player.service';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';

@Component({
  selector: 'lms-player-update',
  templateUrl: './player-update.component.html',
  styleUrls: ['./player-update.component.css']
})
export class PlayerUpdateComponent implements OnInit {

  error: string;
  leagueId = {};
  leagues: League[];
  leagueSelected: League;
  divisionId = {};
  divisions: Division[];
  divisionSelected: Division;
  teams: Team[];
  teamSelected: Team;
  player: Player;

  constructor(
    private playerService: PlayerService,
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private teamService: TeamService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  updatePlayer(): void {
    this.playerService.updatePlayer(this.player)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  deletePlayer(id: any): void {
    this.playerService.deletePlayer(id)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      )
  }

  getAllLeagues(player: Player): void {
    this.leagueService.getAllLeagues()
      .subscribe(
        (leagues: League[]) => {
          this.leagues = leagues;
          this.leagueSelected = _.find(leagues, (league: League) => { return league.id === player.leagueId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  getAllDivisions(player: Player): void {
    this.divisionService.getAllDivisions()
      .subscribe(
        (divisions: Division[]) => {
          this.divisions = divisions;
          this.divisionSelected = _.find(divisions, (division: Division) => { return division.id === player.divisionId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  getAllTeams(player: Player): void {
    this.teamService.getAllTeams()
      .subscribe(
        (teams: Team[]) => {
          this.teams = teams;
          this.teamSelected = _.find(teams, (team: Team) => { return team.id === player.teamId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  onChangeLeague(league: League): void {
    this.leagueId = { leagueId: league.id };
    this.player.leagueId = league.id;
    this.player.leagueName = league.leagueName;
  }

  onChangeDivision(division: Division): void {
    this.divisionId = { divisionId: division.id };
    this.player.divisionId = division.id;
    this.player.divisionName = division.divisionName;
  }

  onChangeTeam(team: Team): void {
    this.player.teamId = team.id;
    this.player.teamName = team.teamName;
  }

  goBack(): void {
    this.router.navigate(['/players']);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .switchMap((params: Params) => this.playerService.getPlayer(+params['id']))
      .subscribe(
        (player: Player) => {
          this.player = player;
          this.getAllLeagues(player);
          this.getAllDivisions(player);
          this.getAllTeams(player);
          this.leagueId = { leagueId: player.leagueId };
          this.divisionId = { divisionId: player.divisionId };
      },
      (error: string) => { this.error = error; }
    );
  }

}
