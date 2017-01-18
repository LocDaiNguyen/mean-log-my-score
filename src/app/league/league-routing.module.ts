import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeagueComponent } from './league.component';
import { LeagueListComponent } from './league-list/league-list.component';
import { LeagueNewComponent } from './league-new/league-new.component';
import { LeagueUpdateComponent } from './league-update/league-update.component';

const routes: Routes = [
  {
    path: '',
    component: LeagueComponent,
    children: [
      {
        path: 'new',
        component: LeagueNewComponent
      },
      {
        path: ':id',
        component: LeagueUpdateComponent
      },
      {
        path: '',
        component: LeagueListComponent
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
export class LeagueRoutingModule {}
