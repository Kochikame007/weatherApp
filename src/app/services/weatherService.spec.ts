import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { WeatherService } from "./weatherService"
import { mockWeatherData, weatherdata } from "../utilities/testData/mockweatherData";
import { weatherMapper } from "../utilities/mapper";
import { GlobalErrorHandler } from "../errorhandler/GlobalErrorHandler";
import { mockForecastData } from "../utilities/testData/mockforecastData";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { GET_CITY_WEATHER_BASE_URL, GET_CITY_WEATHER_FORCAST_BASE_URL, api_key } from "../constants/URLConstants";

describe('WeatherService', () => {
    let service: WeatherService;
    let httpTestingController: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WeatherService, GlobalErrorHandler]
        });
        service = TestBed.inject(WeatherService);
        httpTestingController = TestBed.inject(HttpTestingController);

    })

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('should retrieve weather information ', () => {
        const lat = 51.049999;
        const lon = -114.066666;
        const rawWeatherData = mockWeatherData;
        const rawForecast = mockForecastData;
        service.getWeather(lon, lat).subscribe(res => {
            expect(res).toEqual(weatherMapper(rawWeatherData, rawForecast));
        });
        const weatherRequest = httpTestingController.expectOne(`${GET_CITY_WEATHER_BASE_URL}${lat}&lon=${lon}&appid=${api_key}&units=metric`);
        const forecastRequest = httpTestingController.expectOne(`${GET_CITY_WEATHER_FORCAST_BASE_URL}${lat}&lon=${lon}&appid=${api_key}&units=metric`);

        weatherRequest.flush(mockWeatherData);
        forecastRequest.flush(mockForecastData);
    });
})



