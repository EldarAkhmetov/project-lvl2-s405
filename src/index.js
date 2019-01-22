import _ from 'lodash';
import fs from 'fs';

const genDiff = (path1, path2) => {
  const data1 = JSON.parse(fs.readFileSync(path1));
  const data2 = JSON.parse(fs.readFileSync(path2));
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const firstStep = keys1.reduce((acc, key) => {
    if (_.has(data2, key)) {
      return data1[key] === data2[key]
        ? { ...acc, [`  ${key}`]: data1[key] } : { ...acc, [`+ ${key}`]: data2[key], [`- ${key}`]: data1[key] };
    }
    return { ...acc, [`- ${key}`]: data1[key] };
  }, {});

  const secondStep = keys2.reduce((acc, key) => (_.has(data1, key)
    ? acc : { ...acc, [`+ ${key}`]: data2[key] }), firstStep);
  return JSON.stringify(secondStep);
};

export default genDiff;
