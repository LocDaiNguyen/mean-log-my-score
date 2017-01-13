import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScoreComponent } from './score.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { ScoreNewComponent } from './score-new/score-new.component';

const routes: Routes = [
  {
    path: 'scores',
    component: ScoreComponent,
    children: [
      {
        path: '',
        component: ScoreListComponent
      },
      {
        path: 'new',
        component: ScoreNewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule {}
