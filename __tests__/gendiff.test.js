import fs from 'fs';
import genDiff from '../src';

const getPath = fileName => `__tests__/__fixtures__/${fileName}`;

test.each([
  [getPath('before.json'), getPath('after.json')],
  [getPath('before.yml'), getPath('after.yml')],
  [getPath('before.ini'), getPath('after.ini')],
])(
  'JSON, YML, INI', (path1, path2) => {
    const result = genDiff(path1, path2);
    const expected = fs.readFileSync(getPath('result'), 'utf8');
    expect(result).toBe(expected);
  },
);
