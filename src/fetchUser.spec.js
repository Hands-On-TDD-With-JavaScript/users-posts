import { jest } from '@jest/globals';
// jest.mock('node-fetch');
import fetch from 'node-fetch';

beforeEach(() => {
  jest.mock('node-fetch');
});

describe('fetchUser()', () => {
  it('should work', async () => {
    console.log('=== ', fetch, fetch);
    fetch.mockResolvedValue({ foo: 'bar' });
  })
});
