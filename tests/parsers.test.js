import { expect } from 'chai';
import { integer, float, string, boolean, Type } from '../src/parsers';

describe('Parsers', () => {
  describe('Integer', () => {
    it('Parses integer', () => {
      expect(integer()('10')).to.equal(10);
    });

    it('Returns zero if cannot parse', () => {
      expect(integer()('foo')).to.equal(0);
    });

    it('Accepts default', () => {
      expect(integer({ default: 99 })()).to.equal(99);
    });
  });

  describe('String', () => {
    it('Returns string itself', () => {
      expect(string()('spam')).to.equal('spam');
    });

    it('Converts object to string', () => {
      const obj = { toString() { return 'fish'; } };
      expect(string()(obj)).to.equal('fish');
    });

    it('Accepts default', () => {
      expect(string({ default: 'Hooray!' })()).to.equal('Hooray!');
    });
  });

  describe('Float', () => {
    it('Parses float', () => {
      expect(float()('10.6')).to.equal(10.6);
    });

    it('Returns zero if cannot parse', () => {
      expect(float()('spam')).to.equal(0.0);
    });

    it('Accepts default', () => {
      expect(float({ default: 11.1 })()).to.equal(11.1);
    });
  });

  describe('Boolean', () => {
    it('Recognizes falsy values', () => {
      const falsy = ['', '0', 'no', 'false', 'nope', undefined];
      falsy.forEach(value => expect(boolean()(value)).to.be.false);
    });

    it('Recognizes truthy values', () => {
      const falsy = ['yes', '1', '10', 'true', 'yep', 'spam'];
      falsy.forEach(value => expect(boolean()(value)).to.be.true);
    });

    it('Accepts default', () => {
      expect(boolean({ default: true })()).to.equal(true);
    });
  });

  describe('Types mapping', () => {
    it('Return correct mapping', () => {
      expect(Type.integer).to.equal(integer);
      expect(Type.float).to.equal(float);
      expect(Type.string).to.equal(string);
      expect(Type.boolean).to.equal(boolean);
    });
  });
});
