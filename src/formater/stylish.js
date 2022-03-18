import _ from 'lodash';

const getDataFromObject = (obj, depth) => {
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => {
    const replacer = '    ';
    const currentIndent = replacer.repeat(depth);
    if (_.isPlainObject(value)) {
      return `${currentIndent}${key}: {\n${getDataFromObject(value, depth + 1)}\n${currentIndent}}`;
    }
    return `${currentIndent}${key}: ${value}`;
  });
  return result.join('\n');
};

const stylish = (data) => {
  const iter = (arr, depth) => {
    const replacer = '    ';
    const currentIndent = replacer.repeat(depth);
    const curIndRemVal = `${replacer.repeat(depth).slice(0, -2)}- `;
    const curIndAddVal = `${replacer.repeat(depth).slice(0, -2)}+ `;
    const result = arr.map((item) => {
      if (item.type === 'nested') {
        return `${currentIndent}${item.name}: {\n${iter(item.value, depth + 1)}\n${currentIndent}}`;
      }

      if (item.type === 'changed') {
        const deletedValue = _.isPlainObject(item.value[0]) ? `{\n${getDataFromObject(item.value[0], depth + 1)}\n${currentIndent}}` : `${item.value[0]}`;
        const addedValue = _.isPlainObject(item.value[1]) ? `{\n${getDataFromObject(item.value[1], depth + 1)}\n${currentIndent}}` : `${item.value[1]}`;
        return `${curIndRemVal}${item.name}: ${deletedValue}\n${curIndAddVal}${item.name}: ${addedValue}`;
      }

      if (item.type === 'added') {
        const value = _.isPlainObject(item.value) ? `{\n${getDataFromObject(item.value, depth + 1)}\n${currentIndent}}` : `${item.value}`;
        return `${curIndAddVal}${item.name}: ${value}`;
      }

      if (item.type === 'removed') {
        const value = _.isPlainObject(item.value) ? `{\n${getDataFromObject(item.value, depth + 1)}\n${currentIndent}}` : `${item.value}`;
        return `${curIndRemVal}${item.name}: ${(value)}`;
      }

      return `${currentIndent}${item.name}: ${item.value}`;
    });

    return result.join('\n');
  };

  return `{\n${iter(data, 1)}\n}`;
};

export default stylish;
