import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../../model/city';

@Pipe({
  name: 'filterlist',
  standalone: true
})

/**
  * Filters the list of cities based on the provided search text.
  * @param {City[]} list - The list of cities to filter.
  * @param {string} searchText - The search text used for filtering.
  * @returns {City[]} The filtered list of cities.
  */
export class FilterList implements PipeTransform {

  transform(list: City[], searchText: string): City[] {
    if (!list || !searchText)
      return list;

    return list.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }

}
