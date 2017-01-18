import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeasonComponent } from './season.component';
import { SeasonListComponent } from './season-list/season-list.component';
import { SeasonNewComponent } from './season-new/season-new.component';
import { SeasonUpdateComponent } from './season-update/season-update.component';

const routes: Routes = [
  {
    path: '',
    component: SeasonComponent,
    children: [
      {
        path: 'new',
        component: SeasonNewComponent
      },
      {
        path: ':id',
        component: SeasonUpdateComponent
      },
      {
        path: '',
        component: SeasonListComponent
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
export class SeasonRoutingModule {}
