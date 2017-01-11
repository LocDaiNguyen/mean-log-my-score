import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeamComponent } from './team.component';

import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './team-list/team-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TeamRoutingModule,
  ],
  declarations: [
    TeamComponent,
    TeamListComponent,
  ]
})
export class TeamModule { }
