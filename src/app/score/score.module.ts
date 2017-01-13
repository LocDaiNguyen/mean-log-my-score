import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScoreComponent } from './score.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { ScoreNewComponent } from './score-new/score-new.component';
import { ScoreUpdateComponent } from './score-update/score-update.component';

import { ScoreRoutingModule } from './score-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

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
    ScoreUpdateComponent,
  ]
})
export class ScoreModule { }
