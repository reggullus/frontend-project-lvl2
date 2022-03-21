import _ from 'lodash';

const makeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const iter = (obj, path = []) => {
  const result = obj
    .map((item) => {
      const newPath = [...path, item.name];
      const connectedNewPath = newPath.join('.');
      switch (item.type) {
        case 'nested':
          return `${iter(item.value, [...path, item.name])}`;
        case 'added':
          return `Property '${connectedNewPath}' was added with value: ${makeValue(item.value)}`;
        case 'removed':
          return `Property '${connectedNewPath}' was removed`;
        case 'changed':
          return `Property '${connectedNewPath}' was updated. From ${makeValue(item.value[0])} to ${makeValue(item.value[1])}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown object status: '${item.type}'!`);
      }
    })
    .filter((element) => element != null)
    .join('\n');
  return result;
};
const plain = (data) => iter(data, []);

export default plain;
