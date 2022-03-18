import { test, expect } from '@jest/globals';
import getFileСompare from '../index.js';
import { readFile } from '../src/getPath.js';

const jsonFile1 = 'filepath1.json';
const jsonFile2 = 'filepath2.json';
const ymlFile1 = 'filepath1.yml';
const ymlFile2 = 'filepath2.yml';
const result = readFile('flat.txt');

test('test.json', () => {
  expect(getFileСompare(jsonFile1, jsonFile2)).toEqual(result);
});
test('test.yml', () => {
  expect(getFileСompare(ymlFile1, ymlFile2)).toEqual(result);
});
