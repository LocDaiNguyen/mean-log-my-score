import { NgModule } from '@angular/core';

import { FilterByPipe } from './filter-by.pipe';
import { FilterExcludePipe } from './filter-exclude.pipe';

@NgModule({
  imports: [],
  declarations: [
    FilterByPipe,
    FilterExcludePipe
  ],
  exports: [
    FilterByPipe,
    FilterExcludePipe
  ]
})
export class FilterByPipeModule { }
