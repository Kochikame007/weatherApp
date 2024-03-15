import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class SharedService {

    constructor() {

    }

    private weatherData = new BehaviorSubject<any>(null);
    _weatherData = this.weatherData.asObservable();

    private countryData = new BehaviorSubject<any>(null);
    _countryData = this.countryData.asObservable();

    updateWeather(data: any) {
        this.weatherData.next(data);
    }

    updateCountry(data: any) {
        this.countryData.next(data);
    }
}