import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { League } from '../shared/league.model';
import { LeagueService } from '../shared/league.service';

@Component({
  selector: 'lms-league-update',
  templateUrl: './league-update.component.html',
  styleUrls: ['./league-update.component.css']
})
export class LeagueUpdateComponent implements OnInit {

  error: string;
  league: League;

  constructor(
    private leagueService: LeagueService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  updateLeague(): void {
    this.leagueService.updateLeague(this.league)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  deleteLeague(id: any): void {
    this.leagueService.deleteLeague(id)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.leagueService.getLeague(+params['id']))
      .subscribe(
        (league: League) => { this.league = league; },
        (error: string) => { this.error = error; }
      );
  }

}
