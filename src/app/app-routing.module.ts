import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'leagues',
    loadChildren: 'app/league/league.module#LeagueModule'
  },
  {
    path: 'divisions',
    loadChildren: 'app/division/division.module#DivisionModule'
  },
  {
    path: 'teams',
    loadChildren: 'app/team/team.module#TeamModule'
  },
  {
    path: 'players',
    loadChildren: 'app/player/player.module#PlayerModule'
  },
  {
    path: 'seasons',
    loadChildren: 'app/season/season.module#SeasonModule'
  },
  {
    path: 'games',
    loadChildren: 'app/game/game.module#GameModule'
  },
  {
    path: 'scores',
    loadChildren: 'app/score/score.module#ScoreModule'
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
