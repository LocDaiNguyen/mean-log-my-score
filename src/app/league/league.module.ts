import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeagueComponent } from './league.component';
import { LeagueListComponent } from './league-list/league-list.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';

import { LeagueRoutingModule } from './league-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeagueRoutingModule,
  ],
  declarations: [
    LeagueComponent,
    LeagueListComponent,
    LeagueDetailComponent,
  ]
})
export class LeagueModule { }
