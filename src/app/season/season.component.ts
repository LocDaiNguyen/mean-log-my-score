import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Season } from './shared/season.model';
import { SeasonService } from './shared/season.service';

@Component({
  selector: 'lms-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  seasons$: Observable<Season[]>;
  selectedSeason: Season;

  constructor(
    private seasonService: SeasonService
  ) { }

  ngOnInit() {
    this.seasons$ = this.seasonService.seasons$;
    this.seasonService.getAllSeasons();
  }

  resetSeason() {
    let emptySeason: Season = {
      id: null,
      seasonName: null,
      leagueId: null,
      leagueName: null,
      divisionId: null,
      divisionName: null,
      teamId: null,
      teamName: null,
      playerId: null,
      playerName: null
    };
    this.selectedSeason = emptySeason;
  }

  selectSeason(season: Season) {
    this.selectedSeason = season;
  }

  saveSeason(season: Season) {
    this.seasonService.saveSeason(season);
    this.resetSeason();
  }

  deleteSeason(season: Season) {
    this.seasonService.deleteSeason(season);
    this.resetSeason();
  }

}
