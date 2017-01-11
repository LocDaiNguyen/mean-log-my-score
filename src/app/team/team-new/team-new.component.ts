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
  leagueSelected: League;
  leagues: League[];
  divisionSelected: Division;
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
        team => this.teams.push(team),
        error => this.error = error
      );

     this.goBack();
  }

  getAllTeams() {
    this.teamService.getAllTeams()
      .subscribe(
        teams => this.teams = teams,
        error => this.error = error
      )
  }

  getAllLeagues() {
    this.leagueService.getAllLeagues()
      .subscribe(
        leagues => {
          this.leagues = leagues;
          this.leagueSelected = leagues[0];
        },
        error => this.error = error
      );
  }

  getAllDivisions() {
    this.divisionService.getAllDivisions()
      .subscribe(
        divisions => {
          this.divisions = divisions;
          this.divisionSelected = divisions[0];
        },
        error => this.error = error
      );
  }

  goBack(): void {
    this.router.navigate(['/teams']);
  }

  ngOnInit() {
    this.getAllTeams();
    this.getAllLeagues();
    this.getAllDivisions();
  }

}
