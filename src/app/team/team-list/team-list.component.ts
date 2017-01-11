import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { Team } from '../shared/team.model';
import { TeamService } from '../shared/team.service';

@Component({
  selector: 'lms-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  error: string;
  teams: Team[];
  noTeams: boolean;

  constructor(
    private teamService: TeamService,
    private router: Router
  ) { }

  getAllTeams(): void {
    this.teamService.getAllTeams()
      .subscribe(
        teams => {
          this.teams = teams;
          this.setNoTeams(teams);
        },
        error => this.error = error
      );
  }

  setNoTeams(teams): void {
    if (teams.length > 0) {
      this.noTeams = false;
    } else {
      this.noTeams = true;
    }
  }

  goTo(team: Team): void {
    this.router.navigate(['/teams', team.id]);
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

}
