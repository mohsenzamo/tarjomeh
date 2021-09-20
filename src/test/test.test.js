const { test } = require("@jest/globals");
const search = require('./search');

let testArray = ['mohsen','armin','ladan','ali','zahra'];
let testItem1 = 'mohsen';
let testItem2 = '';
let testItem3 = 'hamid';

test('adds testArray & testItem1 to be 1', () => {
    expect(search(testArray, testItem1)).toBe(1);
  });

test('adds testArray & testItem2 to be 0', () => {
    expect(search(testArray, testItem2)).toBe(0);
  });

test('adds testArray & testItem3 to be -1', () => {
    expect(search(testArray, testItem3)).toBe(-1);
  });