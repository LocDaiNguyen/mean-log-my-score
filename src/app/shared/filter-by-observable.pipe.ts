import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'filterByObser',
  pure: false
})
export class FilterByObservablePipe implements PipeTransform {

  private filterByObject(filter) {
    return value => {
      for (let key in filter) {
        if (!value.hasOwnProperty(key)) {
          return false;
        }

        const type = typeof filter[key];
        let isMatching;

        
        isMatching = this.filterDefault(filter[key])(value[key]);

        if (!isMatching) {
          return false;
        }
      }

      return true;
    };
  }

  /**
   * Defatul filterDefault function
   *
   * @param filter
   * @returns {(value:any)=>boolean}
   */
  private filterDefault(filter) {
    return value => {
      return !filter || filter == value;
    };
  }

  transform(values: any[], filter: any): any {
    if (values.length) {
      return this.filterByObject(filter);
    }
  }
}
