import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupComponent } from './setup.component';
import { LeagueComponent } from '../league/league.component';
import { DivisionComponent } from '../division/division.component';

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
  ]
})
export class SetupModule { }
