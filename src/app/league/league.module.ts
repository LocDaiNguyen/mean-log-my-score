import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueComponent } from './league.component';

import { LeagueRoutingModule } from './league-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LeagueRoutingModule,
  ],
  declarations: [
    LeagueComponent,
  ]
})
export class LeagueModule { }
