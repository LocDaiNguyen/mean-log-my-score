import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { GameListComponent } from './game-list/game-list.component';

const routes: Routes = [
  {
    path: 'games',
    component: GameComponent,
    children: [
      {
        path: '',
        component: GameListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
