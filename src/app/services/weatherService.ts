// api_key = "f3cdd9878a169a789dbb8702a386aa28";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GET_CITY_WEATHER_BASE_URL, GET_CITY_WEATHER_FORCAST_BASE_URL, api_key } from "../constants/URLConstants";
import { catchError, forkJoin, map, throwError } from "rxjs";
import { weatherMapper } from "../utilities/mapper";
import { GlobalErrorHandler } from "../errorhandler/GlobalErrorHandler";



@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    constructor(private http: HttpClient, private globalErrorHandler: GlobalErrorHandler) {

    }

    /**
    * Makes simultaneous API calls to fetch current weather and forecast using OpenWeatherMap API.
    * @param {number} lon - The longitude coordinate of the location.
    * @param {number} lat - The latitude coordinate of the location.
    * @returns {Observable<any[]>} An Observable that emits an array containing the current weather and forecast data.
    */
    getWeather(lon: number, lat: number) {
        const GET_CITY_WEATHER = `${GET_CITY_WEATHER_BASE_URL}${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        const GET_CITY_WEATHER_FORCAST = `${GET_CITY_WEATHER_FORCAST_BASE_URL}${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        const getWeather = this.http.get(GET_CITY_WEATHER)
        const getWeatherForecast = this.http.get(GET_CITY_WEATHER_FORCAST);
        return forkJoin([getWeather, getWeatherForecast]).pipe(
            map(([weather, forecast]) => weatherMapper(weather, forecast)),
            catchError((err) => {
                this.globalErrorHandler.handleError(err);
                return throwError(() => err);
            }));
    }



}
