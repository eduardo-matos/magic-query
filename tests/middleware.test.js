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

  it('Parses custom format', () => {
    req.query.foo = 'foo';

    queryParser({ foo: value => `${value}bar` })(req, res, next);
    expect(req.q.foo).to.equal('foobar');
  });
});
