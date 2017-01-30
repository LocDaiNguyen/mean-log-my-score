import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeamComponent } from './team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';

import { TeamRoutingModule } from './team-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    TeamComponent,
    TeamListComponent,
    TeamDetailComponent,
  ]
})
export class TeamModule { }
