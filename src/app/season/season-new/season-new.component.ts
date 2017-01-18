import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'lms-season-new',
  templateUrl: './season-new.component.html',
  styleUrls: ['./season-new.component.css']
})
export class SeasonNewComponent implements OnInit {

  error: string;
  leagueId = {};
  leagues: League[];
  divisionId = {};
  divisions: Division[];
  teamId = {};
  teams: Team[];
  players: Player[];
  seasons: Season[];

  constructor(
    private seasonService: SeasonService,
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private teamService: TeamService,
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  createSeason(form: NgForm): '' | void {

    let newSeason = new Season(
      form.value.leagueSelected.id,
      form.value.leagueSelected.leagueName,
      form.value.divisionSelected.id,
      form.value.divisionSelected.divisionName,
      form.value.teamSelected.id,
      form.value.teamSelected.teamName,
      form.value.playerSelected.id,
      form.value.playerSelected.playerName,
      form.value.seasonName
    )

    if (!newSeason) { return; }

    this.seasonService.createSeason(newSeason)
      .subscribe(
        (season: Season) => { this.seasons.push(season); },
        (error: string) => { this.error = error; }
      );

    this.goBack();
  }

  getAllSeasons(): void {
    this.seasonService.getAllSeasons()
      .subscribe(
        (seasons: Season[]) => { this.seasons = seasons; },
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

  getAllPlayers(): void {
    this.playerService.getAllPlayers()
      .subscribe(
        (players: Player[]) => { this.players = players; },
        (error: string) => { this.error = error; }
      );
  }

  onChangeLeague(league: League): void {
    this.leagueId = { leagueId: league.id };
  }

  onChangeDivision(division: Division): void {
    this.divisionId = { divisionId: division.id };
  }

  onChangeTeam(team: Team): void {
    this.teamId = { teamId: team.id };
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.getAllSeasons();
    this.getAllLeagues();
    this.getAllDivisions();
    this.getAllTeams();
    this.getAllPlayers();
  }

}
