import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../../services/sharedService';
import { weather } from '../../utilities/weatherData';
import { CommonModule } from '@angular/common';
import { weatherMapper } from '../../utilities/mapper';
import { forecast } from '../../utilities/forecast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { TemperatureFilterPipe } from '../../utilities/custompipes/temperature-filter.pipe';
import { degreeSymbol } from '../../constants/URLConstants';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TemperatureFilterPipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  sunny = faSun;

  targetSymbol = degreeSymbol + 'F';
  currentSymbol = degreeSymbol + 'C';

  constructor(public sharedservice: SharedService) { }
  ngOnInit(): void {
    // this.sharedservice.updateWeather(weatherMapper(weather, forecast));
  }

 
}
