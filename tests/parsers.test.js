import { expect } from 'chai';
import parsers from '../src/parsers';
import { INTEGER } from '../src/types';

describe('Parsers', () => {
  describe('Integer', () => {
    expect(parsers[INTEGER]).to.be.a('function');
  });
});
