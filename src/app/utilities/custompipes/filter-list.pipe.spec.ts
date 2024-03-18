import { mockCitynames } from '../testData/mockCitydata';
import { FilterList } from './filter-list.pipe';

describe('FilterList', () => {
  it('create an instance', () => {
    const pipe = new FilterList();
    expect(pipe).toBeTruthy();
  });

  it('should return number of cities basecd on the searchtext', () => {
    const pipe = new FilterList();
    const cities = mockCitynames;
    const searchText = 'y'
    let city = pipe.transform(cities, searchText);
    const result = [{ name: 'Calgary', country: 'Canada', countryCode: 'CA', lat: 51.049999, lon: -114.066666 },
    { name: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6895, lon: 139.6917 },
    { name: 'New York City', country: 'United States', countryCode: 'US', lat: 40.7128, lon: -74.0060 },
    { name: 'Sydney', country: 'Australia', countryCode: 'AU', lat: -33.8688, lon: 151.2093 }]
    expect(city).toEqual(result);
  })
});
