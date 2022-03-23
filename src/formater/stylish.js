import _ from 'lodash';

const currentIndent = (depth) => '    '.repeat(depth);

const getDataFromObject = (obj, depth = 1) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const bracketIndent = currentIndent(depth - 1);
  const result = Object
    .entries(obj)
    .map(([key, value]) => `${currentIndent(depth)}${key}: ${getDataFromObject(value, depth + 1)}`);
  return [
    '{',
    ...result,
    `${bracketIndent}}`,
  ].join('\n');
};

const iter = (arr, depth) => {
  const curIndRemVal = `${currentIndent(depth).slice(0, -2)}- `;
  const curIndAddVal = `${currentIndent(depth).slice(0, -2)}+ `;
  const ident = depth + 1;

  const result = arr.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${currentIndent(depth)}${item.name}: {\n${iter(item.value, ident)}\n${currentIndent(depth)}}`;
      case 'changed':
        return `${curIndRemVal}${item.name}: ${getDataFromObject(item.value[0], ident)}\n${curIndAddVal}${item.name}: ${getDataFromObject(item.value[1], ident)}`;
      case 'added':
        return `${curIndAddVal}${item.name}: ${getDataFromObject(item.value, ident)}`;
      case 'removed':
        return `${curIndRemVal}${item.name}: ${getDataFromObject(item.value, ident)}`;
      case 'unchanged':
        return `${currentIndent(depth)}${item.name}: ${item.value}`;
      default:
        throw new Error(`Unknown status! "${item.type}" wrong!`);
    }
  });
  return result.join('\n');
};

const stylish = (data) => `{\n${iter(data, 1)}\n}`;

export default stylish;
