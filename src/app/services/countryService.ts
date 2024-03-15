import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class countryService {

    constructor(private http: HttpClient) { }

    getCountryInfo(country: string) {
        const url = `https://en.wikipedia.org/w/api.php`;
        const params = {
            action: 'query',
            prop: 'extracts',
            exintro: '',
            explaintext: '',
            titles: country,
            format: 'json',
            origin: '*'
        };
        return this.http.get(url, { params });
    }

}