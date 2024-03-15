import { Pipe, PipeTransform } from '@angular/core';
import { degreeSymbol } from '../constants/URLConstants';

@Pipe({
  name: 'temperatureFilter',
  standalone: true
})
export class TemperatureFilterPipe implements PipeTransform {

  transform(temp: any): any {
    return Math.round(temp)+ degreeSymbol+'C';
  }

}
