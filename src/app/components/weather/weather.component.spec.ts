import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { SharedService } from '../../services/sharedService';
import { mockWeatherData, weatherdata } from '../../utilities/testData/mockweatherData';
import { of } from 'rxjs';
import { TemperatureFilterPipe } from '../../utilities/custompipes/temperature-filter.pipe';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let sharedservice: SharedService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherComponent, TemperatureFilterPipe],
      providers: [SharedService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    sharedservice = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display weather data', () => {
    const weatherData = weatherdata;
    sharedservice._weatherData = of(weatherData);
    fixture.detectChanges();
    const containerEle = HTMLElement = fixture.nativeElement.querySelector('.container');
    expect(containerEle).toBeTruthy();
    expect(containerEle.textContent).toContain(weatherData.city);
    expect(containerEle.textContent).toContain(`${Math.round(weatherData.temp)}°C`);
    expect(containerEle.textContent).toContain(weatherData.day);
    expect(containerEle.textContent).toContain(`${Math.round(weatherData.temp_max)}°C`);
    expect(containerEle.textContent).toContain(`${Math.round(weatherData.temp_min)}°C`);
    expect(containerEle.textContent).toContain(weatherData.humidity);
    expect(containerEle.textContent).toContain(weatherData.pressure);
  })

  it('should not display weather data when data is null', () => {
    sharedservice._weatherData = of(null);
    fixture.detectChanges();
    const containerElement: HTMLElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement).toBeFalsy();
  });


});
