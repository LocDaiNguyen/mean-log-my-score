import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DivisionComponent } from './division.component';
import { DivisionListComponent } from './division-list/division-list.component';
import { DivisionDetailComponent } from './division-detail/division-detail.component';

import { DivisionRoutingModule } from './division-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DivisionRoutingModule,
  ],
  declarations: [
    DivisionComponent,
    DivisionListComponent,
    DivisionDetailComponent,
  ]
})
export class DivisionModule { }
