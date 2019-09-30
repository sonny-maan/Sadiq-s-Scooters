const code = require('./code');

test('adds 1 + 2 to equal 3', () => {
  expect(code(1, 2)).toBe(3);
});
