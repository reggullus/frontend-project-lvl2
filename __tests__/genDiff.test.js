import { test, expect, describe } from '@jest/globals';
import getDiff from '../index.js';
import { readFile } from '../src/getPath.js';

describe.each([
  {
    file1: 'filepath1.json', file2: 'filepath2.json', format: 'stylish', result: 'flat.txt',
  },
  {
    file1: 'filepath1.yml', file2: 'filepath2.yml', format: 'stylish', result: 'flat.txt',
  },
  {
    file1: 'filepath1.json', file2: 'filepath2.json', format: 'plain', result: 'plain.txt',
  },
  {
    file1: 'filepath1.yml', file2: 'filepath2.yml', format: 'plain', result: 'plain.txt',
  },
  {
    file1: 'filepath1.json', file2: 'filepath2.json', format: 'json', result: 'json.txt',
  },
  {
    file1: 'filepath1.yml', file2: 'filepath2.yml', format: 'json', result: 'json.txt',
  },
])('.add($file1, $file2, $format)', ({
  file1, file2, format, result,
}) => {
  test(`test${format}`, () => {
    const expected = readFile(result);
    expect(getDiff(file1, file2, format)).toEqual(expected);
  });
});
