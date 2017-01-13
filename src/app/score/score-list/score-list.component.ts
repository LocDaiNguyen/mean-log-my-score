import { Component, OnInit } from '@angular/core';

import { Score } from '../shared/score.model';
import { ScoreService } from '../shared/score.service';

@Component({
  selector: 'lms-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  error: string;
  scores: Score[];
  noScores: boolean;

  constructor(private scoreService: ScoreService) { }

  getAllScores(): void {
    this.scoreService.getAllScores()
      .subscribe(
        (scores: Score[]) => {
          this.scores = scores;
          this.setNoScores(scores);
        },
        (error: string) => { this.error = error; }
      );
  }

  setNoScores(scores: Score[]): void {
    if (scores.length > 0) {
      this.noScores = false;
    } else {
      this.noScores = true;
    }
  }

  ngOnInit(): void {
    this.getAllScores();
  }

}
