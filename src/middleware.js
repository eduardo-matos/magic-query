import _ from 'lodash';


export default function middleware(config) {
  return (req, res, next) => {
    req.q = {};
    _.forOwn(config, (parse, param) => {
      req.q[param] = parse(req.query[param]);
    });
    next();
  };
}
