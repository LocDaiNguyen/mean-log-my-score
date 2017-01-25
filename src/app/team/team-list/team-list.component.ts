import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Team } from '../shared/team.model';

@Component({
  selector: 'lms-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  @Input() teams: Team[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
