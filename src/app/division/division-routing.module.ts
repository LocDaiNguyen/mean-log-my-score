import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DivisionComponent } from './division.component';
import { DivisionListComponent } from './division-list/division-list.component';

const routes: Routes = [
  {
    path: 'divisions',
    component: DivisionComponent,
    children: [
      {
        path: '',
        component: DivisionListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivisionRoutingModule {}
