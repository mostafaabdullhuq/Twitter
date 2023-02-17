import { HumanDatesPipe } from './human-dates.pipe';

describe('HumanDatesPipe', () => {
  it('create an instance', () => {
    const pipe = new HumanDatesPipe();
    expect(pipe).toBeTruthy();
  });
});
