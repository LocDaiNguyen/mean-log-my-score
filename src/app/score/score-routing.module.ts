import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScoreComponent } from './score.component';
import { ScoreListComponent } from './score-list/score-list.component';

const routes: Routes = [
  {
    path: 'scores',
    component: ScoreComponent,
    children: [
      {
        path: '',
        component: ScoreListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule {}
