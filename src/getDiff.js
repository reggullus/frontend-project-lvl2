import { getFormat, readFile } from './getPath.js';
import parsersFilter from './parsers.js';
import fileСompare from './getTree.js';
import formatData from './formater/index.js';

const getDiff = (data1, data2, format = 'stylish') => {
  const format1 = getFormat(data1);
  const format2 = getFormat(data2);

  const getPath1 = readFile(data1);
  const getPath2 = readFile(data2);

  const file1 = parsersFilter(getPath1, format1);
  const file2 = parsersFilter(getPath2, format2);

  const compareData = fileСompare(file1, file2);

  return formatData(compareData, format);
};
export default getDiff;
