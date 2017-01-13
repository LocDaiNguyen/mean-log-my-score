import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScoreRoutingModule } from './score-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

import { ScoreComponent } from './score.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { ScoreNewComponent } from './score-new/score-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScoreRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    ScoreComponent,
    ScoreListComponent,
    ScoreNewComponent,
  ]
})
export class ScoreModule { }
