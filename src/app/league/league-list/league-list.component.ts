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
  noLeagues: boolean;

  constructor(
    private leagueService: LeagueService,
    private router: Router
  ) { }

  getAllLeagues(): void {
    this.leagueService.getAllLeagues()
      .subscribe(
        (leagues) => {
          this.leagues = leagues;
          this.setNoLeagues(leagues);
        },
        (error) => { this.error = error; }
      );
  }

  setNoLeagues(leagues): void {
    if (leagues.length > 0) {
      this.noLeagues = false;
    } else {
      this.noLeagues = true;
    }
  }

  goTo(league: League): void {
    this.router.navigate(['/leagues', league.id]);
  }

  ngOnInit(): void {
    this.getAllLeagues();
  }

}
