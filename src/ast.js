import _ from 'lodash';

const states = [
  {
    state: 'nested',
    check: (obj1, obj2, key) => obj1[key] instanceof Object && obj2[key] instanceof Object,
    process: (value1, value2, ast) => ({ children: ast(value1, value2) }),
  },
  {
    state: 'new',
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (value1, value2) => ({ value: value2 }),
  },
  {
    state: 'deleted',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: value1 => ({ value: value1 }),
  },
  {
    state: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: value1 => ({ value: value1 }),
  },
  {
    state: 'changed',
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key],
    process: (value1, value2) => ({ oldValue: value1, newValue: value2 }),
  },
];

const ast = (obj1, obj2) => {
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  return unitedKeys.map((key) => {
    const { state, process } = states.find(({ check }) => check(obj1, obj2, key));
    return { key, state, ...process(obj1[key], obj2[key], ast) };
  });
};
export default ast;
