import { expect } from 'chai';
import { integer, float, string, boolean, date, Type } from '../src/parsers';

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

    it('Accepts default as function', () => {
      expect(integer({ default: () => 22 })()).to.equal(22);
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

    it('Accepts default as function', () => {
      expect(string({ default: () => 'Yay' })()).to.equal('Yay');
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

    it('Accepts default as function', () => {
      expect(float({ default: () => 22.2 })()).to.equal(22.2);
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
      expect(boolean({ default: true })('')).to.equal(true);
    });

    it('Accepts default as function', () => {
      expect(boolean({ default: () => true })()).to.equal(true);
    });
  });

  describe('Date', () => {
    // it('Default format is year-month-day', () => {
    // it('Accept custom format', () => {

    it('Default format is year-month-day', () => {
      const dt = date()('2002-05-07');
      expect(dt).to.be.instanceOf(Date);
      expect(dt.getSeconds()).to.equal(0);
      expect(dt.getMinutes()).to.equal(0);
      expect(dt.getHours()).to.equal(0);
      expect(dt.getDate()).to.equal(7);
      expect(dt.getMonth()).to.equal(4);
      expect(dt.getFullYear()).to.equal(2002);
    });

    it('Accepts custom format', () => {
      const dt = date({ format: 'DD-MM-YYYY HH:mm:ss' })('17-12-1993 04:21:55');
      expect(dt).to.be.instanceOf(Date);
      expect(dt.getSeconds()).to.equal(55);
      expect(dt.getMinutes()).to.equal(21);
      expect(dt.getHours()).to.equal(4);
      expect(dt.getDate()).to.equal(17);
      expect(dt.getMonth()).to.equal(11);
      expect(dt.getFullYear()).to.equal(1993);
    });

    it('Accepts default', () => {
      const defaultDate = new Date(2001, 1, 1);
      const dt = date({ default: defaultDate })();
      expect(dt).to.equal(defaultDate);
    });

    it('Accepts default as function', () => {
      const dt = date({ default: () => new Date(2004, 5, 2) })();
      expect(dt).to.eql(new Date(2004, 5, 2));
    });
  });

  describe('Types mapping', () => {
    it('Return correct mapping', () => {
      expect(Type.integer).to.equal(integer);
      expect(Type.float).to.equal(float);
      expect(Type.string).to.equal(string);
      expect(Type.boolean).to.equal(boolean);
      expect(Type.date).to.equal(date);
    });
  });
});
