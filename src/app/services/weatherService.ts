// api_key = "f3cdd9878a169a789dbb8702a386aa28";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GET_CITY_WEATHER_BASE_URL, GET_CITY_WEATHER_FORCAST_BASE_URL, api_key } from "../constants/URLConstants";
import { forkJoin, map } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class weatherService {

    constructor(private http: HttpClient) {

    }

    



    getWeather(lon: number, lat: number) {
        const GET_CITY_WEATHER = `${GET_CITY_WEATHER_BASE_URL}${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        const GET_CITY_WEATHER_FORCAST = `${GET_CITY_WEATHER_FORCAST_BASE_URL}${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        const getWeather = this.http.get(GET_CITY_WEATHER)
        const getWeatherForecast = this.http.get(GET_CITY_WEATHER_FORCAST);
        return forkJoin([getWeather, getWeatherForecast])

    }



}
