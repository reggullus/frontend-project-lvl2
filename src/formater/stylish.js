import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth);

const getDataFromObject = (obj, depth = 1) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const currentIndent = getIndent(depth);
  const bracketIndent = getIndent(depth - 1);
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
  const ident = depth + 1;
  const currentIndent = getIndent(depth);
  const curIndRemVal = `${currentIndent.slice(0, -2)}- `;
  const curIndAddVal = `${currentIndent.slice(0, -2)}+ `;

  const result = arr.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${currentIndent}${item.name}: {\n${iter(item.value, ident)}\n${currentIndent}}`;
      case 'changed':
        return `${curIndRemVal}${item.name}: ${getDataFromObject(item.value[0], ident)}\n${curIndAddVal}${item.name}: ${getDataFromObject(item.value[1], ident)}`;
      case 'added':
        return `${curIndAddVal}${item.name}: ${getDataFromObject(item.value, ident)}`;
      case 'removed':
        return `${curIndRemVal}${item.name}: ${getDataFromObject(item.value, ident)}`;
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
