import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { WeatherComponent } from './components/weather/weather.component';
import { countryService } from './services/countryService';
import { countries } from './utilities/data';
import { weatherService } from './services/weatherService';
import { weatherMapper } from './utilities/mapper';
import { SharedService } from './services/sharedService';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { CityComponent } from './components/city/city.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WeatherComponent, CityComponent, SearchComponent, RouterOutlet, HeaderComponent, FontAwesomeModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  farotate = faRotate;

  title = 'trip-planner';
  toggle = false;

  constructor(private countryService: countryService, private weatherService: weatherService, public sharedService: SharedService) {
  }

  searchCountries = "Please select a country";
  countriesList = countries;
  lat = 0;
  lon = 0;

  ngOnInit() {
  }

  getCountry(city) {
    this.countryService.getCountryInfo(city.name).subscribe(data => {
      const description = data['query']['pages'][Object.keys(data['query']['pages'])[0]]['extract'].split('.');
      city.description = description[0] + "." + description[1] + "." + description[2] + ".";
      this.sharedService.updateCountry(city);

    });
  }

  getWeather(longitude, latitude) {
    this.weatherService.getWeather(longitude, latitude).subscribe(([weather, forecast]) => {
      console.log("weather", weather);
      console.log("forecast ", forecast);
      this.sharedService.updateWeather(weatherMapper(weather, forecast));
    })

  }

  filterLocation(value: any) {
    console.log(value);
    const place = this.countriesList.filter(item => item.name === value)[0];
    console.log(place, "place")
    this.getWeather(place.lon, place.lat);
    this.getCountry(place)
  }



  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
          }
        }
      )
    }
  }


}




