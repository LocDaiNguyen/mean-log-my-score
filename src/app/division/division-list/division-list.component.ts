import { Component, OnInit } from '@angular/core';

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
    private divisionService: DivisionService
  ) { }

  getAllDivisions(): void {
    this.divisionService.getAllDivisions()
      .subscribe(
        (divisions: Division[]) => {
          this.divisions = divisions;
          this.setNoDivisions(divisions);
        },
        (error: string) => { this.error = error; }
      );
  }

  setNoDivisions(divisions: Division[]): void {
    if (divisions.length > 0) {
      this.noDivisions = false;
    } else {
      this.noDivisions = true;
    }
  }

  ngOnInit(): void {
    this.getAllDivisions();
  }

}
