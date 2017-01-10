import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisionComponent } from './division.component';

import { DivisionRoutingModule } from './division-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DivisionRoutingModule,
  ],
  declarations: [
    DivisionComponent,
  ]
})
export class DivisionModule { }
