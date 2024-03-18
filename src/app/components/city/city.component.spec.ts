import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityComponent } from './city.component';
import { SharedService } from '../../services/sharedService';
import { cityDescription, mockCityData } from '../../utilities/testData/mockCitydata';
import { of } from 'rxjs';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;
  let sharedService: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityComponent],
      providers: [SharedService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render city data', () => {
    const cityData = cityDescription;
    sharedService._cityData = of(cityData);
    fixture.detectChanges();
    const containerEle: HTMLElement = fixture.nativeElement.querySelector('.container')
    expect(containerEle).toBeTruthy();
    expect(containerEle.textContent).toContain(cityData.name);
    expect(containerEle.textContent).toContain(cityData.country);
    expect(containerEle.textContent).toContain(cityData.countryCode);
    expect(containerEle.textContent).toContain(cityData.description);
  })

  it('should not render UI when city data is null', () => {
    sharedService._cityData = null;
    fixture.detectChanges();
    const containerEle: HTMLElement = fixture.nativeElement.querySelector('.container')
    expect(containerEle).toBeFalsy();
  })




});
