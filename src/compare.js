import _ from 'lodash';
import readFile from './getPath.js';

const getFileСompare = (data1, data2) => {
  const file1 = JSON.parse(readFile(data1));
  const file2 = JSON.parse(readFile(data2));
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
  return `{ \n${getCompare.join('\n')}\n}`;
};

export default getFileСompare;
