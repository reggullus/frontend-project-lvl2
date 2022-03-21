import _ from 'lodash';

const replacer = '    ';

const getDataFromObject = (obj, depth = 1) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const currentIndent = replacer.repeat(depth);
  const bracketIndent = replacer.repeat(depth - 1);
  const result = Object
    .entries(obj)
    .map(([key, value]) => `${currentIndent}${key}: ${getDataFromObject(value, depth + 1)}`);
  return [
    '{',
    ...result,
    `${bracketIndent}}`,
  ].join('\n');
};

const iter = (arr, depth) => {
  const currentIndent = replacer.repeat(depth);
  const curIndRemVal = `${replacer.repeat(depth).slice(0, -2)}- `;
  const curIndAddVal = `${replacer.repeat(depth).slice(0, -2)}+ `;
  const result = arr.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${currentIndent}${item.name}: {\n${iter(item.value, depth + 1)}\n${currentIndent}}`;
      case 'changed':
        return `${curIndRemVal}${item.name}: ${getDataFromObject(item.value[0], depth + 1)}\n${curIndAddVal}${item.name}: ${getDataFromObject(item.value[1], depth + 1)}`;
      case 'added':
        return `${curIndAddVal}${item.name}: ${getDataFromObject(item.value, depth + 1)}`;
      case 'removed':
        return `${curIndRemVal}${item.name}: ${getDataFromObject(item.value, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}${item.name}: ${item.value}`;
      default:
        throw new Error(`Unknown status! "${item.type}" wrong!`);
    }
  });
  return result.join('\n');
};

const stylish = (data) => `{\n${iter(data, 1)}\n}`;

export default stylish;
