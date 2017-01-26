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
      leagueName: '',
      divisionId: null,
      divisionName: '',
      teamId: null,
      teamName: '',
      playerId: null,
      playerName: '',
      seasonId: null,
      seasonName: '',
      opponentId: null,
      opponentName: '',
      date: '',
      time: '',
      gameType: '',
      gameId: null,
      scoreType: '',
      situation: '',
      period: '',
      scoreTime: '',
      goalScorerId: null,
      goalScorerName: '',
      assistorOneId: null,
      assistorOneName: '',
      assistorTwoId: null,
      assistorTwoName: ''
    };
    this.selectedScore = emptyScore;
  }

  selectScore(score: Score) {
    this.selectedScore = score;
  }

  saveScore(score: Score) {
    this.scoreService.saveScore(score);
    this.resetScore();
  }

  deleteScore(score: Score) {
    this.scoreService.deleteScore(score);
    this.resetScore();
  }

}
