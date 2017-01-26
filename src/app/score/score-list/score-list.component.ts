import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Score } from '../shared/score.model';

@Component({
  selector: 'lms-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  @Input() scores: Score[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
