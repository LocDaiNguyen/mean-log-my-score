import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SeasonComponent } from './season.component';
import { SeasonListComponent } from './season-list/season-list.component';
import { SeasonDetailComponent } from './season-detail/season-detail.component';

import { SeasonRoutingModule } from './season-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SeasonRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    SeasonComponent,
    SeasonListComponent,
    SeasonDetailComponent,
  ]
})
export class SeasonModule { }
