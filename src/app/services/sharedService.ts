import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})


/**
 * Service for managing shared weather and country data.
 */
export class SharedService {

    constructor() {

    }

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
    private countryData = new BehaviorSubject<any>(null);
    _countryData = this.countryData.asObservable();

    updateWeather(data: any) {
        this.weatherData.next(data);
    }

    updateCountry(data: any) {
        this.countryData.next(data);
    }
}