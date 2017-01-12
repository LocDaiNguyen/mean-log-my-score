import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerComponent } from './player.component';
import { PlayerListComponent } from './player-list/player-list.component';

import { PlayerRoutingModule } from './player-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule,
  ],
  declarations: [
    PlayerComponent,
    PlayerListComponent,
  ]
})
export class PlayerModule { }
