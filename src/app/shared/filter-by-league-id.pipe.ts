import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByLeagueId',
  pure: false
})
export class FilterByLeagueIdPipe implements PipeTransform {

  transform(values: Array<any>): any {
    return console.log(values);
  }
}
