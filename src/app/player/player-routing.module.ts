import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent } from './player.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerNewComponent } from './player-new/player-new.component';
import { PlayerUpdateComponent } from './player-update/player-update.component';

const routes: Routes = [
  {
    path: 'players',
    component: PlayerComponent,
    children: [
      {
        path: '',
        component: PlayerListComponent
      },
      {
        path: 'new',
        component: PlayerNewComponent
      },
      {
        path: ':id',
        component: PlayerUpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {}
