import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Division } from '../shared/division.model';
import { DivisionService } from '../shared/division.service';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';

@Component({
  selector: 'lms-division-new',
  templateUrl: './division-new.component.html',
  styleUrls: ['./division-new.component.css']
})
export class DivisionNewComponent implements OnInit {

  error: string;
  leagueSelected: League;
  leagues: League[];
  divisions: Division[];

  constructor(
    private divisionService: DivisionService,
    private leagueService: LeagueService,
    private router: Router
  ) { }

  createDivision(form): '' | void {

    let newDivision = new Division(form.value.league.id, form.value.league.leagueName, form.value.divisionName);

    if (!newDivision) { return; }

    this.divisionService.createDivisiion(newDivision)
      .subscribe(
        division => this.divisions.push(division),
        error => this.error = error
      );

     this.goBack();
  }

  getAllDivisions() {
    this.divisionService.getAllDivisions()
      .subscribe(
        divisions => this.divisions = divisions,
        error => this.error = error
      );
  }

  getAllLeagues() {
    this.leagueService.getAllLeagues()
      .subscribe(
        leagues => {
          this.leagues = leagues;
          this.leagueSelected = leagues[0];
        },
        error => this.error = error
      )
  }

  goBack(): void {
    this.router.navigate(['/divisions']);
  }

  ngOnInit() {
    this.getAllDivisions();
    this.getAllLeagues();
  }

}
