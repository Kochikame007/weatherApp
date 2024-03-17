import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { WeatherComponent } from './components/weather/weather.component';
import { countryService } from './services/countryService';
import { countries } from './utilities/data';
import { weatherService } from './services/weatherService';
import { SharedService } from './services/sharedService';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { CityComponent } from './components/city/city.component';


/**
 * This Component sets the layout for the UI
 * 
*/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WeatherComponent, CityComponent, SearchComponent, HeaderComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  farotate = faRotate;
  title = 'trip-planner';
  searchCountries = "Please select a country";
  countriesList = countries;
  lat = 0;
  lon = 0;
  toggle = false; //toggle card  between weather and country

  constructor(private countryService: countryService, private weatherService: weatherService, public sharedService: SharedService) {
  }



  /**
    * Retrieves country information from the API and updates the shared service.
    * @param {any} city - The selected city object.
    */
  getCountry(city) {
    this.countryService.getCountryInfo(city.name).subscribe(data => {
      const description = data['query']['pages'][Object.keys(data['query']['pages'])[0]]['extract'].split('.');
      city.description = description[0] + "." + description[1] + "." + description[2] + ".";
      this.sharedService.updateCountry(city);

    });
  }

  /**
   * Retrieves weather information from the API and updates the shared service.
   * @param {number} longitude - The longitude coordinate.
   * @param {number} latitude - The latitude coordinate.
   */
  getWeather(longitude, latitude) {
    this.weatherService.getWeather(longitude, latitude).subscribe((data) => {
      this.sharedService.updateWeather(data);
    })

  }


  /**
   * Filters the location based on the selected value and retrieves weather and country information.
   * @param {any} value - The selected value.
   */
  filterLocation(value: any) {
    const place = this.countriesList.filter(item => item.name === value)[0];
    this.getWeather(place.lon, place.lat);
    this.getCountry(place)
  }


  /**
     * Retrieves the current geolocation coordinates.
     */
  // this is not being used--under review
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




