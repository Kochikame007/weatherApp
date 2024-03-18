import { TestBed } from "@angular/core/testing"
import { CityService } from "./cityService";
import { HttpClientModule } from "@angular/common/http";
import { mockCityData } from "../utilities/testData/mockCitydata";
import { of } from "rxjs";
import { mapCityData } from "../utilities/mapper";

describe('CityService', () => {
    let service: CityService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [CityService]
        }).compileComponents();
        service = TestBed.inject(CityService)
    });

    it('should create city service', () => {
        expect(service).toBeTruthy();
    })

    it('should retrieve city information from wikipedia', () => {
        const city = "Tokyo";
        const data = mockCityData;
        spyOn(service['http'], 'get').and.returnValue(of(data));
        service.getCityInfo(city).subscribe(res => {
            expect(res).toEqual(mapCityData(data));
        })
    })


})
