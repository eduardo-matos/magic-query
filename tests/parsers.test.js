import { expect } from 'chai';
import { int, float, str, bool, Type } from '../src/parsers';

describe('Parsers', () => {
  describe('Integer', () => {
    it('Parses integer', () => {
      expect(int('10')).to.equal(10);
    });

    it('Returns zero if cannot parse', () => {
      expect(int('foo')).to.equal(0);
    });
  });

  describe('String', () => {
    it('Returns string itself', () => {
      expect(str('spam')).to.equal('spam');
    });

    it('Converts object to string', () => {
      const obj = { toString() { return 'fish'; } };
      expect(str(obj)).to.equal('fish');
    });
  });

  describe('Float', () => {
    it('Parses float', () => {
      expect(float('10.6')).to.equal(10.6);
    });

    it('Returns zero if cannot parse', () => {
      expect(float('spam')).to.equal(0.0);
    });
  });

  describe('Boolean', () => {
    it('Recognizes falsy values', () => {
      const falsy = ['', '0', 'no', 'false', 'nope', undefined];
      falsy.forEach(value => expect(bool(value)).to.be.false);
    });

    it('Recognizes truthy values', () => {
      const falsy = ['yes', '1', '10', 'true', 'yep', 'spam'];
      falsy.forEach(value => expect(bool(value)).to.be.true);
    });
  });

  describe('Types mapping', () => {
    it('Return correct mapping', () => {
      expect(Type.INTEGER).to.equal(int);
      expect(Type.FLOAT).to.equal(float);
      expect(Type.STRING).to.equal(str);
      expect(Type.BOOLEAN).to.equal(bool);
    });
  });
});
