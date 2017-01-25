import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Team } from './shared/team.model';
import { TeamService } from './shared/team.service';

@Component({
  selector: 'lms-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams$: Observable<Team[]>;
  selectedTeam: Team;

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teams$ = this.teamService.teams$;
    this.teamService.getAllTeams();
  }

  resetTeam() {
    let emptyTeam: Team = {id: null, teamName: '', leagueId: null, leagueName: '', divisionId: null, divisionName: ''};
    this.selectedTeam = emptyTeam;
  }

  selectTeam(team: Team) {
    this.selectedTeam = team;
  }

  saveTeam(team: Team) {
    this.teamService.saveTeam(team);
    this.resetTeam();
  }

  deleteTeam(team: Team) {
    this.teamService.deleteTeam(team);
    this.resetTeam();
  }

}
