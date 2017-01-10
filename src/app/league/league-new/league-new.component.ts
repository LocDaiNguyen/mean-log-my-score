import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { League } from '../shared/league.model';
import { LeagueService } from '../shared/league.service';

@Component({
  selector: 'lms-league-new',
  templateUrl: './league-new.component.html',
  styleUrls: ['./league-new.component.css']
})
export class LeagueNewComponent implements OnInit {

  error: string;
  leagues: League[];

  constructor(
    private leagueService: LeagueService,
    private router: Router
  ) { }

  createLeague(form: NgForm): '' | void {

    let league = new League(form.value.leagueName);

    if (!league) { return; }

    this.leagueService.createLeague(league)
      .subscribe(
        rleague => {this.leagues.push(rleague); console.log(this.leagues);},
        error => this.error = error
      );

    this.goBack();
  }

  getAllLeagues(): void {
    this.leagueService.getAllLeagues()
      .subscribe(
        rleagues => this.leagues = rleagues,
        error => this.error = error
      );
  }

  goBack(): void {
    this.router.navigate(['/leagues']);
  }

  ngOnInit() {
    this.getAllLeagues();
  }

}
