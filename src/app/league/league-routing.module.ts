import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeagueComponent } from './league.component';
import { LeagueListComponent } from './league-list/league-list.component';

const routes: Routes = [
  {
    path: 'leagues',
    component: LeagueComponent,
    children: [
      {
        path: '',
        component: LeagueListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueRoutingModule {}