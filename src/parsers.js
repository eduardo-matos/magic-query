import _ from 'lodash';
import moment from 'moment';


export function integer(config = { default: 0 }) {
  return value => {
    const retVal = parseInt(value, 10);
    return isNaN(retVal) ? executeIfFunction(config.default) : retVal;
  };
}

export function float(config = { default: 0.0 }) {
  return value => {
    const retVal = parseFloat(value);
    return isNaN(retVal) ? executeIfFunction(config.default) : retVal;
  };
}

export function string(config = { default: '' }) {
  return value => (value ? `${value}` : executeIfFunction(config.default));
}

export function boolean(config = { default: false }) {
  return value => {
    if (!value) {
      return executeIfFunction(config.default);
    }

    return !_.includes(['0', 'no', 'false', 'nope'], value);
  };
}

export function date(config = { format: 'YYYY-MM-DD' }) {
  return value => {
    if (!value) {
      return executeIfFunction(config.default);
    }

    return moment(value, config.format).toDate();
  };
}

function executeIfFunction(value) {
  return _.isFunction(value) ? value() : value;
}

export const Type = {
  integer,
  float,
  string,
  boolean,
  date,
};
