import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../model/city';

@Pipe({
  name: 'filterlist',
  standalone: true
})
export class FilterList implements PipeTransform {

  transform(list: Country[], searchText: string): Country[] {
    if (!list || !searchText)
      return list;

    return list.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }

}
