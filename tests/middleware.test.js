import sinon from 'sinon';
import { expect } from 'chai';
import middleware from '../src/middleware';
import { Type } from '../src/parsers';


describe('Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { query: { id: '7' } };
    res = sinon.spy();
    next = sinon.spy();
  });

  it('Returns a function that calls next', () => {
    middleware({})(req, res, next);
    expect(next.called).to.equal(true);
  });

  it('Parses string', () => {
    middleware({ id: Type.STRING })(req, res, next);
    expect(req.q.id).to.be.a('string');
    expect(req.q.id).to.equal('7');
  });

  it('Parses integer', () => {
    middleware({ id: Type.INTEGER })(req, res, next);
    expect(req.q.id).to.be.a('number');
    expect(req.q.id).to.equal(7);
  });

  it('Parses float', () => {
    req.query.height = '1.78';
    middleware({ height: Type.FLOAT })(req, res, next);
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

    middleware({
      foo: Type.BOOLEAN,
      bar: Type.BOOLEAN,
      baz: Type.BOOLEAN,
      qux: Type.BOOLEAN,
      empty: Type.BOOLEAN,
      undef: Type.BOOLEAN,
      spam: Type.BOOLEAN,
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

    middleware({ foo: value => `${value}bar` })(req, res, next);
    expect(req.q.foo).to.equal('foobar');
  });
});
