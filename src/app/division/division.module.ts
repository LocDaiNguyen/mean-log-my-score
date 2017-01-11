import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisionComponent } from './division.component';

import { DivisionRoutingModule } from './division-routing.module';
import { DivisionListComponent } from './division-list/division-list.component';

@NgModule({
  imports: [
    CommonModule,
    DivisionRoutingModule,
  ],
  declarations: [
    DivisionComponent,
    DivisionListComponent,
  ]
})
export class DivisionModule { }
