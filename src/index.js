import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const genDiff = (path1, path2) => {
  const data1 = parse(path.extname(path1), fs.readFileSync(path1));
  const data2 = parse(path.extname(path2), fs.readFileSync(path2));
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unitedKeys = _.union(keys1, keys2);
  const result = unitedKeys.map((key) => {
    if (data1[key] === data2[key]) {
      return `    ${key}: ${data1[key]}`;
    }
    if (_.has(data1, key)) {
      return _.has(data2, key)
        ? `  + ${key}: ${data2[key]}\n  - ${key}: ${data1[key]}`
        : `  - ${key}: ${data1[key]}`;
    }
    return `  + ${key}: ${data2[key]}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
