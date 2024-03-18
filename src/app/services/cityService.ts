import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GET_WIKIPEDIA_EXTRACT } from "../constants/URLConstants";
import { catchError, map, throwError } from "rxjs";
import { GlobalErrorHandler } from "../errorhandler/GlobalErrorHandler";
import { mapCityData } from "../utilities/mapper";

@Injectable({
    providedIn: 'root'
})

export class CityService {

    constructor(private http: HttpClient, private globalErorrhandler: GlobalErrorHandler) { }

    /**
    * Fetches information about a country from Wikipedia.
    * @param {string} city - The name of the city to retrieve information about.
    * @returns {Observable<any>} An Observable that emits the response from the Wikipedia API.
    */
    getCityInfo(city: string) {
        const url = GET_WIKIPEDIA_EXTRACT;
        const params = {
            action: 'query',
            prop: 'extracts',
            exintro: '',
            explaintext: '',
            titles: city,
            format: 'json',
            origin: '*'
        };
        return this.http.get(url, { params }).pipe(map((data) => {
            return mapCityData(data)
        }), catchError((err) => {
            this.globalErorrhandler.handleError(err);
            return throwError(() => err);
        }));

    }

}