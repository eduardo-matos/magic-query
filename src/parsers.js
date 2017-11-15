import _ from 'lodash';


export function int(value) {
  const retVal = parseInt(value, 10);
  return isNaN(retVal) ? 0 : retVal;
}

export function float(value) {
  const retVal = parseFloat(value);
  return isNaN(retVal) ? 0.0 : retVal;
}

export function str(value) {
  return `${value}`;
}

export function bool(value) {
  return !_.includes(['', '0', 'no', 'false', 'nope', undefined], value);
}

export const Type = {
  INTEGER: int,
  FLOAT: float,
  STRING: str,
  BOOLEAN: bool,
};
