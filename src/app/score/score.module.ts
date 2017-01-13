import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScoreRoutingModule } from './score-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

import { ScoreComponent } from './score.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScoreRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    ScoreComponent,
  ]
})
export class ScoreModule { }
