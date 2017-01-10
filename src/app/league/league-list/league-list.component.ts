import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { League } from '../shared/league.model';
import { LeagueService } from '../shared/league.service';

@Component({
  selector: 'lms-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent implements OnInit {

  error: string;
  leagues: League[];

  constructor(
    private leagueService: LeagueService,
    private router: Router
  ) { }

  getAllLeagues() {
    this.leagueService.getAllLeagues()
      .subscribe(
        leagues => this.leagues = leagues,
        error => this.error = error
      );
  }

  goTo(league: League): void {
    this.router.navigate(['/leagues', league.id]);
  }

  ngOnInit() {
    this.getAllLeagues();
  }

}
