import { degreeSymbol } from '../../constants/URLConstants';
import { TemperatureFilterPipe } from './temperature-filter.pipe';

describe('TemperatureFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new TemperatureFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should round the numbers and add temp unit', () => {
    const pipe = new TemperatureFilterPipe();
    let temp = pipe.transform(12.22);
    const transformedText = Math.round(12.22) + degreeSymbol + 'C'
    expect(temp).toBe(transformedText);
  })
});
