import { Component, OnInit } from '@angular/core';

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
    private teamService: TeamService
  ) { }

  getAllTeams(): void {
    this.teamService.getAllTeams()
      .subscribe(
        (teams: Team[]) => {
          this.teams = teams;
          this.setNoTeams(teams);
        },
        (error) => { this.error = error; }
      );
  }

  setNoTeams(teams: Team[]): void {
    if (teams.length > 0) {
      this.noTeams = false;
    } else {
      this.noTeams = true;
    }
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

}
