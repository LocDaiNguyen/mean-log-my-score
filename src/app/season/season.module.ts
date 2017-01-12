import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SeasonComponent } from './season.component';
import { SeasonListComponent } from './season-list/season-list.component';
import { SeasonNewComponent } from './season-new/season-new.component';
import { SeasonUpdateComponent } from './season-update/season-update.component';

import { SeasonRoutingModule } from './season-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SeasonRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    SeasonComponent,
    SeasonListComponent,
    SeasonNewComponent,
    SeasonUpdateComponent
  ]
})
export class SeasonModule { }
