import fs from 'fs';
import genDiff from '../src';

const getPath = fileName => `__tests__/__fixtures__/${fileName}`;

test.each([
  [getPath('before.json'), getPath('after.json')],
  [getPath('before.yml'), getPath('after.yml')],
  [getPath('before.ini'), getPath('after.ini')],
])(
  'Check flat structures JSON, YML, INI', (path1, path2) => {
    const result = genDiff(path1, path2);
    const expected = fs.readFileSync(getPath('result'), 'utf8');
    expect(result).toBe(expected);
  },
);

test.each([
  [getPath('astBefore.json'), getPath('astAfter.json')],
  [getPath('astBefore.yml'), getPath('astAfter.yml')],
  [getPath('astBefore.ini'), getPath('astAfter.ini')],
])(
  'Check nested structures JSON, YML, INI', (path1, path2) => {
    const result = genDiff(path1, path2);
    const expected = fs.readFileSync(getPath('astResult'), 'utf8');
    expect(result).toBe(expected);
  },
);

test.each([
  [getPath('before.json'), getPath('after.json')],
  [getPath('before.yml'), getPath('after.yml')],
  [getPath('before.ini'), getPath('after.ini')],
])(
  'Check plain output for flat JSON, YML, INI', (path1, path2) => {
    const result = genDiff(path1, path2, 'plain');
    const expected = fs.readFileSync(getPath('resultPlain'), 'utf8');
    expect(result).toBe(expected);
  },
);

test.each([
  [getPath('astBefore.json'), getPath('astAfter.json')],
  [getPath('astBefore.yml'), getPath('astAfter.yml')],
  [getPath('astBefore.ini'), getPath('astAfter.ini')],
])(
  'Check plain output for nested JSON, YML, INI', (path1, path2) => {
    const result = genDiff(path1, path2, 'plain');
    const expected = fs.readFileSync(getPath('resultPlainAST'), 'utf8');
    expect(result).toBe(expected);
  },
);
