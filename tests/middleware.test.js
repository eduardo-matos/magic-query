import sinon from 'sinon';
import { expect } from 'chai';
import queryParser from '../src/middleware';
import { Type } from '../src/parsers';


describe('QueryParser middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { query: { id: '7' } };
    res = sinon.spy();
    next = sinon.spy();
  });

  it('Returns a function that calls next', () => {
    queryParser({})(req, res, next);
    expect(next.called).to.equal(true);
  });

  it('Parses string', () => {
    queryParser({ id: Type.string() })(req, res, next);
    expect(req.q.id).to.be.a('string');
    expect(req.q.id).to.equal('7');
  });

  it('Parses integer', () => {
    queryParser({ id: Type.integer() })(req, res, next);
    expect(req.q.id).to.be.a('number');
    expect(req.q.id).to.equal(7);
  });

  it('Parses float', () => {
    req.query.height = '1.78';
    queryParser({ height: Type.float() })(req, res, next);
    expect(req.q.height).to.be.a('number');
    expect(req.q.height).to.equal(1.78);
  });

  it('Parses boolean', () => {
    Object.assign(req.query, {
      foo: '0',
      bar: 'no',
      baz: 'false',
      qux: 'nope',
      empty: '',
      spam: 'yay',
    });

    queryParser({
      foo: Type.boolean(),
      bar: Type.boolean(),
      baz: Type.boolean(),
      qux: Type.boolean(),
      empty: Type.boolean(),
      undef: Type.boolean(),
      spam: Type.boolean(),
    })(req, res, next);

    expect(req.q.foo).to.equal(false);
    expect(req.q.bar).to.equal(false);
    expect(req.q.baz).to.equal(false);
    expect(req.q.qux).to.equal(false);
    expect(req.q.empty).to.equal(false);
    expect(req.q.undef).to.equal(false);

    expect(req.q.spam).to.equal(true);
  });

  describe('Parses date', () => {
    it('Default format is year-month-day', () => {
      req.query.birth = '2012-11-07';
      queryParser({ birth: Type.date() })(req, res, next);

      expect(req.q.birth).to.be.instanceOf(Date);
      expect(req.q.birth.getFullYear()).to.equal(2012);
      expect(req.q.birth.getMonth()).to.equal(10);
      expect(req.q.birth.getDate()).to.equal(7);
      expect(req.q.birth.getHours()).to.equal(0);
      expect(req.q.birth.getMinutes()).to.equal(0);
      expect(req.q.birth.getSeconds()).to.equal(0);
    });

    it('Accept custom format', () => {
      req.query.birth = '05201009';
      queryParser({ birth: Type.date({ format: 'DDYYYYMM' }) })(req, res, next);

      expect(req.q.birth).to.be.instanceOf(Date);
      expect(req.q.birth.getFullYear()).to.equal(2010);
      expect(req.q.birth.getMonth()).to.equal(8);
      expect(req.q.birth.getDate()).to.equal(5);
      expect(req.q.birth.getHours()).to.equal(0);
      expect(req.q.birth.getMinutes()).to.equal(0);
      expect(req.q.birth.getSeconds()).to.equal(0);
    });
  });

  describe('Misc', () => {
    it('Parses custom format', () => {
      req.query.foo = 'foo';

      queryParser({ foo: value => `${value}bar` })(req, res, next);
      expect(req.q.foo).to.equal('foobar');
    });

    it('Gets values from other fields', () => {
      req.query.foo = 'foo';
      req.query.bar = 'bar';

      queryParser({ foo(value) { return value + this.bar; } })(req, res, next);
      expect(req.q.foo).to.equal('foobar');
    });

    it('Accepts new fields', () => {
      req.query.foo = 'foo';
      req.query.bar = 'bar';

      queryParser({ barfoo() { return this.bar + this.foo; } })(req, res, next);
      expect(req.q.barfoo).to.equal('barfoo');
    });

    it('Prefents query modification', () => {
      req.query.foo = 'foo';

      queryParser({ foo() { this.foo += 'bar'; } })(req, res, next);
      expect(req.query.foo).to.equal('foo');
    });
  });
});
