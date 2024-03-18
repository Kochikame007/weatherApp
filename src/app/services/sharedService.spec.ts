import { TestBed } from "@angular/core/testing";
import { SharedService } from "./sharedService"
import { mockWeatherData } from "../utilities/testData/mockweatherData";
import { mockCityData } from "../utilities/testData/mockCitydata";

describe('SharedService', () => {
    let service: SharedService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SharedService]
        });
        service = TestBed.inject(SharedService);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('should initialize weather and country data with null', () => {
        service._weatherData.subscribe(data => {
            expect(data).toBeNull();
        })
        service._cityData.subscribe(data => {
            expect(data).toBeNull();
        })
    })

    it('returns mockCityData Object', (done: DoneFn) => {
        const cityData = mockCityData;
        service.updateCity(cityData);
        service._cityData.subscribe(data => {
            expect(data).toBe(mockCityData);
            done();
        })
    })


    it('return mockWeatherData Object', (done: DoneFn) => {
        const weatherData = mockWeatherData;
        service.updateWeather(weatherData);
        service._weatherData.subscribe(data => {
            expect(data).toBe(mockWeatherData);
            done();
        })
    })
})