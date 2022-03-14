import { test, expect } from '@jest/globals';
import getFileСompare from '../index.js';
import readFile from '../src/getPath.js';

const file1 = 'filepath1.json';
const file2 = 'filepath2.json';
const result = readFile('flat.txt');
test('flatfile', () => {
  expect(getFileСompare(file1, file2)).toEqual(result);
});
