import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

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
    private route: ActivatedRoute
  ) { }

  updateDivision(): void {
    this.divisionService.updateDivision(this.division)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  deleteDivision(id: any): void {
    this.divisionService.deleteDivision(id)
      .subscribe(
        () => { this.goBack(); },
        (error: string) => { this.error = error; }
      );
  }

  getAllLeagues(division: Division): void {
    this.leagueService.getAllLeagues()
      .subscribe(
        (leagues: League[]) => {
          this.leagues = leagues;
          this.leagueSelected = leagues.find((league: League) => { return league.id === division.leagueId; });
        },
        (error: string) => { this.error = error; }
      );
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.divisionService.getDivision(+params['id']))
      .subscribe(
        (division: Division) => {
          this.division = division;
          this.getAllLeagues(division);
        },
        (error: string) => { this.error = error; }
      );
  }

}
