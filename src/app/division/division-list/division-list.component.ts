import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { Division } from '../shared/division.model';
import { DivisionService } from '../shared/division.service';

@Component({
  selector: 'lms-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.css']
})
export class DivisionListComponent implements OnInit {

  error: string;
  divisions: Division[];
  noDivisions: boolean;

  constructor(
    private divisionService: DivisionService,
    private router: Router
  ) { }

  getAllDivisions(): void {
    this.divisionService.getAllDivisions()
      .subscribe(
        (divisions) => {
          this.divisions = divisions;
          this.setNoDivisions(divisions);
        },
        (error) => { this.error = error; }
      );
  }

  setNoDivisions(divisions): void {
    if (divisions.length > 0) {
      this.noDivisions = false;
    } else {
      this.noDivisions = true;
    }
  }

  goTo(division: Division): void {
    this.router.navigate(['/divisions', division.id]);
  }

  ngOnInit(): void {
    this.getAllDivisions();
  }

}
