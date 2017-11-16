import _ from 'lodash';


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

export const Type = {
  integer,
  float,
  string,
  boolean,
};
