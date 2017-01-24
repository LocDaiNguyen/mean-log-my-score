import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { League } from '../shared/league.model';

@Component({
  selector: 'lms-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeagueListComponent implements OnInit {

  @Input() leagues: League[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
