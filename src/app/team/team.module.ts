import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeamComponent } from './team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamNewComponent } from './team-new/team-new.component';
import { TeamUpdateComponent } from './team-update/team-update.component';

import { TeamRoutingModule } from './team-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TeamRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    TeamComponent,
    TeamListComponent,
    TeamNewComponent,
    TeamUpdateComponent,
  ]
})
export class TeamModule { }
