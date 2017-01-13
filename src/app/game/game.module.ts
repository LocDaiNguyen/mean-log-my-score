import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GameRoutingModule } from './game-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

import { GameComponent } from './game.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameNewComponent } from './game-new/game-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GameRoutingModule,
    FilterByPipeModule,
  ],
  declarations: [
    GameComponent,
    GameListComponent,
    GameNewComponent,
  ]
})
export class GameModule { }
