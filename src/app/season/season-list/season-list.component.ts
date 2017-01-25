import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Season } from '../shared/season.model';

@Component({
  selector: 'lms-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.css']
})
export class SeasonListComponent implements OnInit {

  @Input() seasons: Season[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
