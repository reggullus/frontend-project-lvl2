import { test, expect } from '@jest/globals';
import getFileСompare from '../index.js';
import { readFile } from '../src/getPath.js';

const jsonFile1 = 'filepath1.json';
const jsonFile2 = 'filepath2.json';
const yamlFile1 = 'filepath1.yaml';
const yamlFile2 = 'filepath2.yaml';
const result = readFile('flat.txt');

test('flatfile.json', () => {
  expect(getFileСompare(jsonFile1, jsonFile2)).toEqual(result);
});
test('flatfile.yml', () => {
  expect(getFileСompare(yamlFile1, yamlFile2)).toEqual(result);
});
