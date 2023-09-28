const Player = require('../js/classes/Player.js');

test('если номер выбранного трека не установлен (null), то предыдущим будет установлен последний трек из списка', () => {
  expect(Player.setPreviousTrackID(null)).toBe(3);
});

test('если номер выбранного трека 1, то предыдущим будет 0', () => {
  expect(Player.setPreviousTrackID(1)).toBe(0);
});

test('если номер выбранного трека 3, то предыдущим будет 2', () => {
  expect(Player.setPreviousTrackID(3)).toBe(2);
});

test('если номер выбранного трека 0, то предыдущим будет 3', () => {
  expect(Player.setPreviousTrackID(0)).toBe(3);
});


test('если номер выбранного трека не установлен (null), то текущим будет установлен первый трек, следующим - следующий трек по списку', () => {
  expect(Player.setNextTrackID(null)).toBe(1);
});

test('если номер выбранного трека 1, то следующим будет 2', () => {
  expect(Player.setNextTrackID(1)).toBe(2);
});

test('если номер выбранного трека 0, то следующим будет 1', () => {
  expect(Player.setNextTrackID(0)).toBe(1);
});

test('если номер выбранного трека 3, то следующим будет 0', () => {
  expect(Player.setNextTrackID(3)).toBe(0);
});