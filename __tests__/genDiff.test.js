import { test, expect, describe } from '@jest/globals';
import getDiff from '../index.js';
import { readFile } from '../src/getPath.js';

const jsonFile1 = 'filepath1.json';
const jsonFile2 = 'filepath2.json';
const ymlFile1 = 'filepath1.yml';
const ymlFile2 = 'filepath2.yml';
const result = readFile('flat.txt');
const plain = readFile('plain.txt');
const json = readFile('json.txt');

describe(('stylishTest'), () => {
  test('json', () => {
    expect(getDiff(jsonFile1, jsonFile2)).toEqual(result);
  });
  test('yml', () => {
    expect(getDiff(ymlFile1, ymlFile2)).toEqual(result);
  });
});

describe(('plainTest'), () => {
  test('json', () => {
    expect(getDiff(jsonFile1, jsonFile2, 'plain')).toEqual(plain);
  });
  test('yml', () => {
    expect(getDiff(ymlFile1, ymlFile2, 'plain')).toEqual(plain);
  });
});

describe('jsonTest', () => {
  test(('json'), () => {
    expect(getDiff(jsonFile1, jsonFile2, 'json')).toEqual(json);
  });
  test('yml', () => {
    expect(getDiff(ymlFile1, ymlFile2, 'json')).toEqual(json);
  });
});

console.log(getDiff(jsonFile1, jsonFile2, 'json'));
