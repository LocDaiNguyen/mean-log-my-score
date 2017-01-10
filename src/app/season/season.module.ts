import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonComponent } from './season.component';
import { SeasonListComponent } from './season-list/season-list.component';
import { SeasonNewComponent } from './season-new/season-new.component';
import { SeasonUpdateComponent } from './season-update/season-update.component';

import { SeasonRoutingModule } from './season-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SeasonRoutingModule,
  ],
  declarations: [
    SeasonComponent,
    SeasonListComponent,
    SeasonNewComponent,
    SeasonUpdateComponent
  ]
})
export class SeasonModule { }
