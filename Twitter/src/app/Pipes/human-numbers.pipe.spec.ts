import { HumanNumbersPipe } from './human-numbers.pipe';

describe('HumanNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new HumanNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
