import fs from 'fs';
import genDiff from '../src';

const getPath = fileName => `__tests__/__fixtures__/${fileName}`;

test('JSON', () => {
  const result = genDiff(getPath('before.json'), getPath('after.json'));
  const expected = fs.readFileSync(getPath('result'), 'utf8');
  expect(result).toBe(expected);
});

test('YML', () => {
  const result = genDiff(getPath('before.yml'), getPath('after.yml'));
  const expected = fs.readFileSync(getPath('result'), 'utf8');
  expect(result).toBe(expected);
});
