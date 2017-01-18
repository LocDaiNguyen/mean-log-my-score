import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScoreComponent } from './score.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { ScoreNewComponent } from './score-new/score-new.component';
import { ScoreUpdateComponent } from './score-update/score-update.component';

const routes: Routes = [
  {
    path: '',
    component: ScoreComponent,
    children: [
      {
        path: 'new',
        component: ScoreNewComponent
      },
      {
        path: ':id',
        component: ScoreUpdateComponent
      },
      {
        path: '',
        component: ScoreListComponent
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
export class ScoreRoutingModule {}
