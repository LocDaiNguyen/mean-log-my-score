import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameNewComponent } from './game-new/game-new.component';
import { GameUpdateComponent } from './game-update/game-update.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'new',
        component: GameNewComponent
      },
      {
        path: ':id',
        component: GameUpdateComponent
      },
      {
        path: '',
        component: GameListComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
