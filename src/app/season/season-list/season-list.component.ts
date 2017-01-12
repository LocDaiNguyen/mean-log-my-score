import { Component, OnInit } from '@angular/core';

import { Season } from '../shared/season.model';
import { SeasonService } from '../shared/season.service';

@Component({
  selector: 'lms-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.css']
})
export class SeasonListComponent implements OnInit {

  error: string;
  seasons: Season[];
  noSeasons; boolean;

  constructor(private seasonService: SeasonService) { }

  getAllSeasons(): void {
    this.seasonService.getAllSeasons()
      .subscribe(
        (seasons: Season[]) => {
          this.seasons = seasons;
          this.setNoSeasons(seasons);
        },
        (error: string) => { this.error = error; }
      );
  }

  setNoSeasons(seasons: Season[]): void {
    if (seasons.length > 0) {
      this.noSeasons = false;
    } else {
      this.noSeasons = true;
    }
  }

  ngOnInit(): void {
    this.getAllSeasons();
  }

}
