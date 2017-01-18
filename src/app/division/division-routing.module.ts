import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DivisionComponent } from './division.component';
import { DivisionListComponent } from './division-list/division-list.component';
import { DivisionNewComponent } from './division-new/division-new.component';
import { DivisionUpdateComponent } from './division-update/division-update.component';

const routes: Routes = [
  {
    path: '',
    component: DivisionComponent,
    children: [
      {
        path: 'new',
        component: DivisionNewComponent
      },
      {
        path: ':id',
        component: DivisionUpdateComponent
      },
      {
        path: '',
        component: DivisionListComponent
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
export class DivisionRoutingModule {}
