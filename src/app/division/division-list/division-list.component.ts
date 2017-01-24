import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Division } from '../shared/division.model';

@Component({
  selector: 'lms-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DivisionListComponent implements OnInit {

  @Input() divisions: Division[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
