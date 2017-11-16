import _ from 'lodash';
import moment from 'moment';


export function integer() {
  return value => {
    const retVal = parseInt(value, 10);
    return isNaN(retVal) ? 0 : retVal;
  };
}

export function float() {
  return value => {
    const retVal = parseFloat(value);
    return isNaN(retVal) ? 0.0 : retVal;
  };
}

export function string() {
  return value => `${value}`;
}

export function boolean() {
  return value => !_.includes(['', '0', 'no', 'false', 'nope', undefined], value);
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
