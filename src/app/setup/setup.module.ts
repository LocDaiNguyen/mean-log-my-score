import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupComponent } from './setup.component';
import { LeagueComponent } from '../league/league.component';
import { DivisionComponent } from '../division/division.component';
import { TeamComponent } from '../team/team.component';

import { SetupRoutingModule } from './setup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SetupRoutingModule,
  ],
  declarations: [
    SetupComponent,
    LeagueComponent,
    DivisionComponent,
    TeamComponent,
  ]
})
export class SetupModule { }
