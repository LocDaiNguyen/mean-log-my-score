import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';

import { LeagueComponent } from './league.component';
import { LeagueListComponent } from './league-list/league-list.component';


@NgModule({
  imports: [
    CommonModule,
    LeagueRoutingModule,
  ],
  declarations: [
    LeagueComponent,
    LeagueListComponent,
  ]
})
export class LeagueModule { }
