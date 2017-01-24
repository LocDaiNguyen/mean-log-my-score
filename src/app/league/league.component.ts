import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { League } from './shared/league.model';
import { LeagueService } from './shared/league.service';

@Component({
  selector: 'lms-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeagueComponent implements OnInit {

  leagues$: Observable<League[]>;
  selectedLeague: League;

  constructor(
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.leagues$ = this.leagueService.leagues$;
    this.leagueService.getAllLeagues();
  }

  resetLeague() {
    let emptyLeague: League = {id: null, leagueName: ''};
    this.selectedLeague = emptyLeague;
  }

  selectLeague(league: League) {
    this.selectedLeague = league;
  }

  saveLeague(league: League) {
    this.leagueService.saveLeague(league);
    this.resetLeague();
  }

  deleteLeague(league: League) {
    this.leagueService.deleteLeague(league);
    this.resetLeague();
  }

}
