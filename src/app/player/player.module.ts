import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlayerComponent } from './player.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

import { PlayerRoutingModule } from './player-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlayerRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    PlayerComponent,
    PlayerListComponent,
    PlayerDetailComponent,
  ]
})
export class PlayerModule { }
