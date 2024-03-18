import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { City } from '../../model/city';
import { compileComponentClassMetadata } from '@angular/compiler';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should intialise showAll property to false', () => {
    expect(component.showAll).toBeFalsy();
  })

  it('should show all cities', () => {
    component.showAllCities();
    expect(component.showAll).toBeTruthy();
  })

  it('should reflect placeholder and list input properties correctly', () => {
    const placeholder = 'Enter city name';
    const list: City[] = [{ name: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6895, lon: 139.6917 },];
    component.placeholder = placeholder;
    component.list = list;
    component.showAll = true;
    fixture.detectChanges();
    const inputEle: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const listElement: HTMLDivElement = fixture.nativeElement.querySelector('.list');
    expect(inputEle.placeholder).toBe(placeholder);
    expect(component.list).toBe(list);
    expect(listElement).toBeTruthy();
  })

  it('should show city list when input field is focused', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('focus'));
    expect(component.showAll).toBeTruthy();
  })

  it('should emit value of selection', () => {
    const city: City = { name: 'Calgary', country: 'Canada', countryCode: 'CA', lat: 51.049999, lon: -114.066666 };
    const emitSpy = spyOn(component.valueEmitter, 'emit');
    component.selectCity(city);
    fixture.detectChanges();
    // expect(component.searchControl.value).toBe('Calgary');
    expect(emitSpy).toHaveBeenCalledWith(city.name);
    expect(component.showAll).toBe(false);
  })

  it('should show all cities on focus', () => {
    component.showAllCities();
    expect(component.showAll).toBeTrue();
  })

  it('should hide all cities after delay on blur', fakeAsync(() => {
    const inputEle: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputEle.dispatchEvent(new Event('blue'));
    tick(500);
    expect(component.showAll).toBeFalse();
  }))

  it('should handle empty list Correctly', () => {
    const list: City[] = [];
    component.list = list;
    component.showAll;
    fixture.detectChanges();
    const listElement: HTMLDivElement = fixture.nativeElement.querySelector('.list');
    expect(listElement).toBeFalsy();

  })


});
