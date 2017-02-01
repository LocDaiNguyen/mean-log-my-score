import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScoreComponent } from './score.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { ScoreDetailComponent } from './score-detail/score-detail.component';

import { ScoreRoutingModule } from './score-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScoreRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    ScoreComponent,
    ScoreListComponent,
    ScoreDetailComponent,
  ]
})
export class ScoreModule { }
