import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamComponent } from './team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamNewComponent } from './team-new/team-new.component';
import { TeamUpdateComponent } from './team-update/team-update.component';

const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
    children: [
      {
        path: 'new',
        component: TeamNewComponent
      },
      {
        path: ':id',
        component: TeamUpdateComponent
      },
      {
        path: '',
        component: TeamListComponent
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
export class TeamRoutingModule {}
