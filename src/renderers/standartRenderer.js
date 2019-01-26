import _ from 'lodash';

const spacesNumber = 4;

const stringify = (value, spaces) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const newSpacesNumber = spacesNumber + spaces;
  const keys = Object.keys(value);
  return `{\n${keys.map(element => `${' '.repeat(newSpacesNumber)}${element}: ${stringify(value[element], newSpacesNumber)}`).join('\n')}\n${' '.repeat(spaces)}}`;
};

const stateActions = {
  new: (element, spaces) => `${' '.repeat(spaces - 2)}+ ${element.key}: ${stringify(element.value, spaces)}`,
  deleted: (element, spaces) => `${' '.repeat(spaces - 2)}- ${element.key}: ${stringify(element.value, spaces)}`,
  nested: (element, spaces, newDepth, format) => `${' '.repeat(spaces)}${element.key}: ${format(element.children, newDepth)}`,
  unchanged: (element, spaces) => `${' '.repeat(spaces)}${element.key}: ${stringify(element.value, spaces)}`,
  changed: (element, spaces) => [`${' '.repeat(spaces - 2)}+ ${element.key}: ${stringify(element.newValue, spaces)}`,
    `${' '.repeat(spaces - 2)}- ${element.key}: ${stringify(element.oldValue, spaces)}`],
};

const render = (ast, depth = 1) => {
  const newDepth = depth + 1;
  const spaces = spacesNumber * depth;
  const previousDepthSpaces = spacesNumber * (depth - 1);
  const preRender = ast.map((element) => {
    const getState = stateActions[element.state];
    return getState(element, spaces, newDepth, render);
  });
  return `{\n${_.flatten(preRender).join('\n')}\n${' '.repeat(previousDepthSpaces)}}`;
};

export default render;
