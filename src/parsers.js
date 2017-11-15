import _ from 'lodash';
import * as Types from './types';


export default {
  [Types.INTEGER]: parseInt,
  [Types.FLOAT]: parseFloat,
  [Types.STRING]: value => `${value}`,
  [Types.BOOLEAN]: value => {
    return !_.includes(['', '0', 'no', 'false', 'nope', undefined], value);
  },
};
