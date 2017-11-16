import _ from 'lodash';
import moment from 'moment';


export function integer(config = { default: 0 }) {
  return value => {
    const retVal = parseInt(value, 10);
    return isNaN(retVal) ? config.default : retVal;
  };
}

export function float(config = { default: 0.0 }) {
  return value => {
    const retVal = parseFloat(value);
    return isNaN(retVal) ? config.default : retVal;
  };
}

export function string(config = { default: '' }) {
  return value => (value ? `${value}` : config.default);
}

export function boolean(config = { default: false }) {
  return value => {
    if (value === undefined) {
      return config.default;
    }

    return !_.includes(['', '0', 'no', 'false', 'nope'], value);
  };
}

export function date(options = { format: 'YYYY-MM-DD' }) {
  return value => moment(value, options.format).toDate();
}

export const Type = {
  integer,
  float,
  string,
  boolean,
  date,
};
