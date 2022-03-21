import _ from 'lodash';

const getFileСompare = (data1, data2) => {
  const getKeys = _.sortBy(Object.keys({ ...data1, ...data2 }));
  const getCompare = getKeys.map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        name: key,
        type: 'nested',
        value: getFileСompare(oldValue, newValue),
      };
    }
    if (oldValue === newValue) {
      return {
        name: key,
        type: 'unchanged',
        value: oldValue,
      };
    }
    if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: newValue,
      };
    }
    if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'removed',
        value: oldValue,
      };
    }
    return {
      name: key,
      type: 'changed',
      value: [oldValue, newValue],
    };
  });
  return getCompare;
};
export default getFileСompare;
