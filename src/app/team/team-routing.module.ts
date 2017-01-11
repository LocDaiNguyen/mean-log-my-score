import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamComponent } from './team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamNewComponent } from './team-new/team-new.component';

const routes: Routes = [
  {
    path: 'teams',
    component: TeamComponent,
    children: [
      {
        path: '',
        component: TeamListComponent
      },
      {
        path: 'new',
        component: TeamNewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule {}
