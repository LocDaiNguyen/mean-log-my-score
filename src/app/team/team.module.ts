import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeamComponent } from './team.component';

import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamNewComponent } from './team-new/team-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TeamRoutingModule,
  ],
  declarations: [
    TeamComponent,
    TeamListComponent,
    TeamNewComponent,
  ]
})
export class TeamModule { }
