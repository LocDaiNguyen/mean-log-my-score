import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Score } from './shared/score.model';
import { ScoreService } from './shared/score.service';

@Component({
  selector: 'lms-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  scores$: Observable<Score[]>;
  selectedScore: Score;

  constructor(
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.scores$ = this.scoreService.scores$;
    this.scoreService.getAllScores();
  }

  resetScore() {
    let emptyScore: Score = {
      id: null,
      leagueId: null,
      leagueName: null,
      divisionId: null,
      divisionName: null,
      teamId: null,
      teamName: null,
      playerId: null,
      playerName: null,
      seasonId: null,
      seasonName: null,
      opponentId: null,
      opponentName: null,
      date: null,
      time: null,
      gameType: null,
      gameId: null,
      scoreType: null,
      situation: null,
      period: null,
      scoreTime: null,
      goalScorerId: null,
      goalScorerName: null,
      assistorOneId: null,
      assistorOneName: null,
      assistorTwoId: null,
      assistorTwoName: null
    };
    this.selectedScore = emptyScore;
  }

  selectScore(score: Score) {
    this.selectedScore = score;
  }

  saveScore(score: Score) {
    this.scoreService.saveScore(score);
    this.scoreService.scores$.subscribe(
      item => console.table(item)
    );
    this.resetScore();
  }

  deleteScore(score: Score) {
    this.scoreService.deleteScore(score);
    this.resetScore();
  }

}
