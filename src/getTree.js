import _ from 'lodash';

const getFileСompare = (data1, data2) => {
  const getKeys = _.sortBy(Object.keys({ ...data1, ...data2 }));
  const getCompare = getKeys.map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];
    if (typeof oldValue === 'object' && typeof newValue === 'object') {
      return {
        name: key,
        type: 'nested',
        value: getFileСompare(oldValue, newValue),
      };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (oldValue === newValue) {
        return {
          name: key,
          type: 'unchanged',
          value: oldValue,
        };
      }
      if (oldValue !== newValue) {
        return {
          name: key,
          type: 'changed',
          value: [oldValue, newValue],
        };
      }
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        name: key,
        type: 'removed',
        value: oldValue,
      };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        name: key,
        type: 'added',
        value: newValue,
      };
    }
    return null;
  });
  return getCompare;
};
export default getFileСompare;
