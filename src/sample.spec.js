import { add } from './sample';

describe('test setup should work', () => {
  it('should work', () => {
    expect(1 + -1).toEqual(0);
  });

  it('should add two numbers', () => {
    expect(add(1, -2)).toEqual(1 + -2);
  });
});
