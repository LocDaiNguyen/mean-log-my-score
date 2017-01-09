import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetupComponent } from './setup.component';
import { LeagueComponent } from '../league/league.component';
import { DivisionComponent } from '../division/division.component';
import { TeamComponent } from '../team/team.component';


const routes: Routes = [
  {
    path: 'setup',
    component: SetupComponent,
    children: [
      {
        path: '',
        component: LeagueComponent
      },
      {
        path: 'leagues',
        component: LeagueComponent
      },
      {
        path: 'divisions',
        component: DivisionComponent
      },
      {
        path: 'teams',
        component: TeamComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}