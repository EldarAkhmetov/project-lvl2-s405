import fs from 'fs';
import path from 'path';
import parse from './parsers';
import ast from './ast';
import render from './renderers/index';

const genDiff = (path1, path2, format = 'standart') => {
  const data1 = parse(path.extname(path1), fs.readFileSync(path1, 'utf8'));
  const data2 = parse(path.extname(path2), fs.readFileSync(path2, 'utf8'));
  return render(format)(ast(data1, data2));
};

export default genDiff;
