import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';

import { Division } from '../shared/division.model';
import { DivisionService } from '../shared/division.service';
import { League } from '../../league/shared/league.model';
import { LeagueService } from '../../league/shared/league.service';

@Component({
  selector: 'lms-division-update',
  templateUrl: './division-update.component.html',
  styleUrls: ['./division-update.component.css']
})
export class DivisionUpdateComponent implements OnInit {

  error: string;
  leagueSelected: League;
  leagues: League[];
  division: Division;

  constructor(
    private divisionService: DivisionService,
    private leagueService: LeagueService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  updateDivision() {
    this.divisionService.updateDivision(this.division)
      .subscribe(
        () => this.goBack(),
        error => this.error = error
      );
  }

  deleteDivision(id: string) {
    this.divisionService.deleteDivision(id)
      .subscribe(
        () => this.goBack(),
        error => this.error = error
      );
  }

  goBack() {
    this.router.navigate(['/divisions']);
  }

  getAllLeagues(division) {
    this.leagueService.getAllLeagues()
      .subscribe(
        leagues => {
          this.leagues = leagues;
          this.leagueSelected = _.find(leagues, function(league) {
            return league.id === division.leagueId;
          });
        },
        error => this.error = error
      );
  }

  onChange(league): void {
    console.log(league);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .switchMap((params: Params) => this.divisionService.getDivision(+params['id']))
      .subscribe(
        division => {
          this.division = division;
          this.getAllLeagues(division);
        },
        error => this.error = error
      );
  }

}
