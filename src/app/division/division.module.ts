import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DivisionComponent } from './division.component';

import { DivisionRoutingModule } from './division-routing.module';
import { DivisionListComponent } from './division-list/division-list.component';
import { DivisionNewComponent } from './division-new/division-new.component';
import { DivisionUpdateComponent } from './division-update/division-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DivisionRoutingModule,
  ],
  declarations: [
    DivisionComponent,
    DivisionListComponent,
    DivisionNewComponent,
    DivisionUpdateComponent,
  ]
})
export class DivisionModule { }
