import _ from 'lodash';


export default function queryParser(config) {
  return (req, res, next) => {
    req.q = {};
    _.forOwn(config, (parse, param) => {
      req.q[param] = parse.bind({ ...req.query })(req.query[param]);
    });
    next();
  };
}
