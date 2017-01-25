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
      seasonName: '',
      leagueId: null,
      leagueName: '',
      divisionId: null,
      divisionName: '',
      teamId: null,
      teamName: '',
      playerId: null,
      playerName: ''
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
