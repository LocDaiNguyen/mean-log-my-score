import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeagueRoutingModule } from './league-routing.module';

import { LeagueComponent } from './league.component';
import { LeagueListComponent } from './league-list/league-list.component';
import { LeagueNewComponent } from './league-new/league-new.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LeagueRoutingModule,
  ],
  declarations: [
    LeagueComponent,
    LeagueListComponent,
    LeagueNewComponent,
  ]
})
export class LeagueModule { }
