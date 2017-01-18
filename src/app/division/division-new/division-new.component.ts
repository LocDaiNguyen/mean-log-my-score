import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  createDivision(form: NgForm): '' | void {

    let newDivision = new Division(
      form.value.leagueSelected.id,
      form.value.leagueSelected.leagueName,
      form.value.divisionName
    );

    if (!newDivision) { return; }

    this.divisionService.createDivisiion(newDivision)
      .subscribe(
        (division: Division) => { this.divisions.push(division); },
        (error: string) => { this.error = error; }
      );

     this.goBack();
  }

  getAllDivisions(): void {
    this.divisionService.getAllDivisions()
      .subscribe(
        (divisions: Division[]) => { this.divisions = divisions; },
        (error: string) => { this.error = error; }
      );
  }

  getAllLeagues(): void {
    this.leagueService.getAllLeagues()
      .subscribe(
        (leagues: League[]) => {
          this.leagues = leagues;
          this.leagueSelected = leagues[0];
        },
        (error: string) => { this.error = error; }
      );
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.getAllDivisions();
    this.getAllLeagues();
  }

}
