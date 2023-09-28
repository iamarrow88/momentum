const Background = require('../js/classes/Background.js');

test('adds 20 + 1 to equal 1', () => {
  expect(Background.getNextPictureNumber('next', 20)).toBe('1');
});

test('adds 1 + 1 to equal 2', () => {
  expect(Background.getNextPictureNumber('next', 1)).toBe('2');
});

test('away 1 from 1 to equal 20', () => {
  expect(Background.getNextPictureNumber('prev', 1)).toBe('20');
});

test('away 1 from 20 to equal 19', () => {
  expect(Background.getNextPictureNumber('prev', 20)).toBe('19');
});


test('morning + 01', () => {
  expect(Background.getPathTOPicture('morning', '01')).toBe('https://raw.githubusercontent.com/iamarrow88/bg-collection/main/morning/01.webp');
});

test('afternoon + 20', () => {
  expect(Background.getPathTOPicture('afternoon', '20')).toBe('https://raw.githubusercontent.com/iamarrow88/bg-collection/main/afternoon/20.webp');
});

test('evening + 11', () => {
  expect(Background.getPathTOPicture('evening', '11')).toBe('https://raw.githubusercontent.com/iamarrow88/bg-collection/main/evening/11.webp');
});

test('night + 08', () => {
  expect(Background.getPathTOPicture('night', '08')).toBe('https://raw.githubusercontent.com/iamarrow88/bg-collection/main/night/08.webp');
});


