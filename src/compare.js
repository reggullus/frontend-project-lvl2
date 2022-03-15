import _ from 'lodash';
import { getFormat, readFile } from './getPath.js';
import parsersFilter from './parsers.js';

const getFileСompare = (data1, data2) => {
  const format1 = getFormat(data1);
  const format2 = getFormat(data2);
  const getPath1 = readFile(data1);
  const getPath2 = readFile(data2);
  const file1 = parsersFilter(getPath1, format1);
  const file2 = parsersFilter(getPath2, format2);
  const getKeys = _.sortBy(Object.keys({ ...file1, ...file2 }));
  const getCompare = getKeys.map((key) => {
    const file1Value = file1[key];
    const file2Value = file2[key];
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1Value === file2Value) {
        return `    ${key}: ${file1Value}`;
      }
    }
    if (!_.has(file1, key)) {
      return `  + ${key}: ${file2Value}`;
    }
    if (!_.has(file2, key)) {
      return `  - ${key}: ${file1Value}`;
    }
    return `  - ${key}: ${file1Value}\n  + ${key}: ${file2Value}`;
  });
  return `{\n${getCompare.join('\n')}\n}`;
};

export default getFileСompare;
