import { test, expect } from '@jest/globals';
import getFileСompare from '../index.js';
import readFile from '../src/getPath.js';

const file1 = readFile('filepath1');
const file2 = readFile('filepath2');
test('flatfile', () => {
  expect(getFileСompare(file1, file2)).toMatch(readFile('flat.txt'));
});
