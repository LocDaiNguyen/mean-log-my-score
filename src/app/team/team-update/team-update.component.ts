import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';

import { Team } from '../shared/team.model';
import { TeamService } from '../shared/team.service';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';
import { Division } from '../../division/shared/division.model';
import { DivisionService } from '../../division/shared/division.service';

@Component({
  selector: 'lms-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent implements OnInit {

  error: string;
  leagues: League[];
  leagueSelected: League;
  leagueId = {};
  divisions: Division[];
  divisionSelected: Division;
  team: Team;

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private divisionService: DivisionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  updateTeam(): void {
    this.teamService.updateTeam(this.team)
      .subscribe(
        () => this.goBack(),
        error => this.error = error
      );
  }

  deleteDivision(id: any): void {
    this.teamService.delteTeam(id)
      .subscribe(
        () => this.goBack(),
        error => this.error = error
      );
  }

  getAllLeagues(team): void {
    this.leagueService.getAllLeagues()
      .subscribe(
        leagues => {
          this.leagues = leagues;
          this.leagueSelected = _.find(leagues, function(league) {
            return league.id === team.leagueId;
          });
        },
        error => this.error = error
      );
  }

  getAllDivisions(team): void {
    this.divisionService.getAllDivisions()
      .subscribe(
        divisions => {
          // this.divisions = _.filter(divisions, function(division) {
          //   return division.leagueId === team.leagueId;
          // });
          this.divisions = divisions;
          this.divisionSelected = _.find(divisions, function(division) {
            return division.id === team.divisionId;
          });
        },
        error => this.error = error
      );
  }

  onChangeLeague(league): void {
    this.leagueId = {leagueId: league.id};
    this.team.leagueId = league.id;
    this.team.leagueName = league.leagueName;
    // this.divisionService.getAllDivisions()
    //   .subscribe(
    //     divisions => {
    //       this.divisions = _.filter(divisions, function(division) {
    //         return division.leagueId === league.id;
    //       });
    //       this.divisionSelected = _.find(divisions, function(division) {
    //         return division.leagueId === league.id;
    //       });
    //     },
    //     error => this.error = error
    //   );
  }

  onChangeDivision(division): void {
    this.team.divisionId = division.id;
    this.team.divisionName = division.divisionName;
  }

  goBack(): void {
    this.router.navigate(['/teams']);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .switchMap((params: Params) => this.teamService.getTeam(+params['id']))
      .subscribe(
        team => {
          this.team = team;
          this.getAllLeagues(team);
          this.getAllDivisions(team);
          this.leagueId = {leagueId: team.leagueId};
        },
        error => this.error = error
      );
  }

}
