import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedService } from './services/sharedService';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weatherService';
import { CityService } from './services/cityService';
import { weatherdata } from './utilities/testData/mockweatherData';
import { extract, mockCityData } from './utilities/testData/mockCitydata';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sharedService: SharedService;
  let cityService: CityService;
  let weatherService: WeatherService;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientModule, FontAwesomeModule],
      providers: [SharedService, WeatherService, CityService]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    cityService = TestBed.inject(CityService);
    weatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'trip-planner' title`, () => {
    expect(component.title).toEqual('trip-planner');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Trip Planner');
  });

  it('should display card if the data is present', () => {
    const weatherData = weatherdata;
    sharedService.updateWeather(weatherData);
    fixture.detectChanges();
    const container: HTMLDivElement = fixture.nativeElement.querySelector('.card-container');
    expect(container).toBeTruthy();
  })

  it('should toggle between weather and city card', () => {
    const weatherData = weatherdata;
    sharedService.updateWeather(weatherData);
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector('.toggle');
    expect(component.toggle).toBe(false);

    toggle.click();
    fixture.detectChanges();
    expect(component.toggle).toBe(true);

    toggle.click();
    fixture.detectChanges();
    expect(component.toggle).toBe(false);

  })

  it('should filter location and call weather and city api', () => {
    const city = { name: 'Calgary', country: 'Canada', countryCode: 'CA', lat: 51.049999, lon: -114.066666 };

    spyOn(cityService, 'getCityInfo').and.returnValue(of(extract));
    spyOn(weatherService, 'getWeather').and.returnValue(of(weatherdata))

    component.filterLocation(city.name);

    expect(cityService.getCityInfo).toHaveBeenCalledWith(city.name);
    expect(weatherService.getWeather).toHaveBeenCalledWith(city.lon, city.lat)

  })

});
