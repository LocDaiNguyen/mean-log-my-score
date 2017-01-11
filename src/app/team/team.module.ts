import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeamComponent } from './team.component';

import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TeamRoutingModule,
  ],
  declarations: [
    TeamComponent,
  ]
})
export class TeamModule { }
