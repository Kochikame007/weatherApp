import { Pipe, PipeTransform } from '@angular/core';
import { degreeSymbol } from '../../constants/URLConstants';

@Pipe({
  name: 'temperatureFilter',
  standalone: true
})

/**
  * Adds units to temperature after rounding it off.
  * @param {temp} any - temp to transform.
  * @returns {temp} after transformation.
  */
export class TemperatureFilterPipe implements PipeTransform {

  transform(temp: any): any {
    return Math.round(temp) + degreeSymbol + 'C';
  }

}
