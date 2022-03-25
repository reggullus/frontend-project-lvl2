import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth);

const getDataFromObject = (obj, depth) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const result = Object
    .entries(obj)
    .map(([key, value]) => `${getIndent(depth)}${key}: ${getDataFromObject(value, depth + 1)}`);
  return [
    '{',
    ...result,
    `${getIndent(depth - 1)}}`,
  ].join('\n');
};

const iter = (arr, depth) => {
  const result = arr.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${getIndent(depth)}${item.name}: {\n${iter(item.value, depth + 1)}\n${getIndent(depth)}}`;
      case 'changed':
        return `  ${getIndent(depth - 1)}- ${item.name}: ${getDataFromObject(item.value[0], depth + 1)}\n  ${getIndent(depth - 1)}+ ${item.name}: ${getDataFromObject(item.value[1], depth + 1)}`;
      case 'added':
        return `  ${getIndent(depth - 1)}+ ${item.name}: ${getDataFromObject(item.value, depth + 1)}`;
      case 'removed':
        return `  ${getIndent(depth - 1)}- ${item.name}: ${getDataFromObject(item.value, depth + 1)}`;
      case 'unchanged':
        return `${getIndent(depth)}${item.name}: ${item.value}`;
      default:
        throw new Error(`Unknown status! "${item.type}" wrong!`);
    }
  });
  return result.join('\n');
};

const stylish = (data) => `{\n${iter(data, 1)}\n}`;

export default stylish;
