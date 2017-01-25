import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GameComponent } from './game.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

import { GameRoutingModule } from './game-routing.module';
import { FilterByPipeModule } from '../shared/filter-by.module';

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
    GameDetailComponent,
  ]
})
export class GameModule { }
