import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

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
    private route: ActivatedRoute
  ) { }

  updateTeam(): void {
    this.teamService.updateTeam(this.team)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  deleteTeam(id: number | string): void {
    this.teamService.delteTeam(id)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  // getAllLeagues(team: Team): void {
  //   this.leagueService.getAllLeagues()
  //     .subscribe(
  //       (leagues: League[]) => {
  //         this.leagues = leagues;
  //         this.leagueSelected = leagues.find((league: League) => { return league.id === team.leagueId; });
  //       },
  //       (error: string) => { this.error = error; }
  //     );
  // }

  getAllDivisions(team: Team): void {
    this.divisionService.getAllDivisions()
      .subscribe(
        (divisions: Division[]) => {
          this.divisions = divisions;
          this.divisionSelected = divisions.find((division: Division) => { return division.id === team.divisionId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  onChangeLeague(league: League): void {
    this.leagueId = { leagueId: league.id };
    this.team.leagueId = league.id;
    this.team.leagueName = league.leagueName;
  }

  onChangeDivision(division: Division): void {
    this.team.divisionId = division.id;
    this.team.divisionName = division.divisionName;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.teamService.getTeam(+params['id']))
      .subscribe(
        (team: Team) => {
          this.team = team;
          // this.getAllLeagues(team);
          this.getAllDivisions(team);
          this.leagueId = { leagueId: team.leagueId };
        },
        (error: string) => { this.error = error; }
      );
  }

}
