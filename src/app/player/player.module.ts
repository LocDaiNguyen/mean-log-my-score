import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlayerComponent } from './player.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerNewComponent } from './player-new/player-new.component';

import { PlayerRoutingModule } from './player-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlayerRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    PlayerComponent,
    PlayerListComponent,
    PlayerNewComponent,
  ]
})
export class PlayerModule { }
