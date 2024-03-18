import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})


/**
 * Service for managing shared weather and country data.
 */
export class SharedService {

    /**
     * BehaviorSubject for storing weather data.
     * 
     */
    private weatherData = new BehaviorSubject<any>(null);
    _weatherData = this.weatherData.asObservable();

    /**
     * BehaviorSubject for storing country data.
     * 
     */
    private cityData = new BehaviorSubject<any>(null);
    _cityData = this.cityData.asObservable();

    updateWeather(data: any) {
        this.weatherData.next(data);
    }

    updateCity(data: any) {
        this.cityData.next(data);
    }
}