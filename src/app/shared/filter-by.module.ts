import { NgModule } from '@angular/core';

import { FilterByPipe } from './filter-by.pipe';
import { FilterExcludeSelfPipe } from './filter-exclude-self.pipe';

@NgModule({
  imports: [],
  declarations: [
    FilterByPipe,
    FilterExcludeSelfPipe
  ],
  exports: [
    FilterByPipe,
    FilterExcludeSelfPipe
  ]
})
export class FilterByPipeModule { }
