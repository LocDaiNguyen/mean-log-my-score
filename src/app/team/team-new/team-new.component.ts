import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Team } from '../shared/team.model';
import { TeamService } from '../shared/team.service';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';

@Component({
  selector: 'lms-team-new',
  templateUrl: './team-new.component.html',
  styleUrls: ['./team-new.component.css']
})
export class TeamNewComponent implements OnInit {

  error: string;
  leagueId = {};
  leagues: League[];
  divisions: Division[];
  teams: Team[];

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private router: Router
  ) { }

  createTeam(form): '' | void {

    let newTeam = new Team(
      form.value.leagueSelected.id,
      form.value.leagueSelected.leagueName,
      form.value.divisionSelected.id,
      form.value.divisionSelected.divisionName,
      form.value.teamName
    );

    if (!newTeam) { return; }

    this.teamService.createTeam(newTeam)
      .subscribe(
        (team) => { this.teams.push(team); },
        (error) => { this.error = error; }
      );

     this.goBack();
  }

  getAllTeams(): void {
    this.teamService.getAllTeams()
      .subscribe(
        (teams) => { this.teams = teams; },
        (error) => { this.error = error; }
      );
  }

  getAllLeagues(): void {
    this.leagueService.getAllLeagues()
      .subscribe(
        (leagues) => { this.leagues = leagues; },
        (error) => { this.error = error; }
      );
  }

  getAllDivisions(): void {
    this.divisionService.getAllDivisions()
      .subscribe(
        (divisions) => { this.divisions = divisions; },
        (error) => { this.error = error; }
      );
  }

  onChangeLeague(league): void {
    this.leagueId = { leagueId: league.id };
  }

  goBack(): void {
    this.router.navigate(['/teams']);
  }

  ngOnInit(): void {
    this.getAllTeams();
    this.getAllLeagues();
    this.getAllDivisions();
  }

}
