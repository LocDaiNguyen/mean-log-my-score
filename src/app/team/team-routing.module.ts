import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamComponent } from './team.component';

const routes: Routes = [
  {
    path: 'teams',
    component: TeamComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
});
export class TeamRoutingModule {}
