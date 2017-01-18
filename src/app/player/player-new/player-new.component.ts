import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Player } from '../shared/player.model';
import { PlayerService } from '../shared/player.service';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';
import { Team } from '../../team/shared/team.model';
import { TeamService } from '../../team/shared/team.service';

@Component({
  selector: 'lms-player-new',
  templateUrl: './player-new.component.html',
  styleUrls: ['./player-new.component.css']
})
export class PlayerNewComponent implements OnInit {

  error: string;
  leagueId = {};
  leagues: League[];
  divisionId = {};
  divisions: Division[];
  teams: Team[];
  players: Player[];

  constructor(
    private playerService: PlayerService,
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  createPlayer(form: NgForm): '' | void {

    let newPlayer = new Player(
      form.value.leagueSelected.id,
      form.value.leagueSelected.leagueName,
      form.value.divisionSelected.id,
      form.value.divisionSelected.divisionName,
      form.value.teamSelected.id,
      form.value.teamSelected.teamName,
      form.value.playerName
    )

    if (!newPlayer) { return; }

    this.playerService.createPlayer(newPlayer)
      .subscribe(
        (player: Player) => { this.players.push(player); },
        (error: string) => { this.error = error; }
      );

    this.goBack();
  }

  getAllPlayers(): void {
    this.playerService.getAllPlayers()
      .subscribe(
        (players: Player[]) => { this.players = players; },
        (error: string) => { this.error = error; }
      );
  }

  getAllLeagues(): void {
    this.leagueService.getAllLeagues()
      .subscribe(
        (leagues: League[]) => { this.leagues = leagues; },
        (error: string) => { this.error = error; }
      );
  }

  getAllDivisions(): void {
    this.divisionService.getAllDivisions()
      .subscribe(
        (divisions: Division[]) => { this.divisions = divisions; },
        (error: string) => { this.error = error; }
      );
  }

  getAllTeams(): void {
    this.teamService.getAllTeams()
      .subscribe(
        (teams: Team[]) => { this.teams = teams; },
        (error: string) => { this.error = error; }
      );
  }

  onChangeLeague(league: League): void {
    this.leagueId = { leagueId: league.id };
  }

  onChangeDivision(division: Division): void {
    this.divisionId = { divisionId: division.id };
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.getAllPlayers();
    this.getAllLeagues();
    this.getAllDivisions();
    this.getAllTeams();
  }

}
