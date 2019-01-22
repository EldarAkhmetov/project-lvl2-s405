import genDiff from '../src';

const getPath = fileName => `__tests__/__fixtures__/${fileName}`;

test('JSON', () => {
  const result = genDiff(getPath('before.json'), getPath('after.json'));
  const expected = {
    '  host': 'hexlet.io',
    '+ timeout': 20,
    '- timeout': 50,
    '- proxy': '123.234.53.22',
    '- follow': false,
    '+ verbose': true,
  };
  expect(result).toEqual(JSON.stringify(expected));
});
