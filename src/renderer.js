const spacesNumber = 4;

const stringify = (value, spaces) => {
  if (value instanceof Object) {
    const newSpacesNumber = spacesNumber + spaces;
    const keys = Object.keys(value);
    return `{\n${keys.map(element => `${' '.repeat(newSpacesNumber)}${element}: ${stringify(value[element], newSpacesNumber)}`).join('\n')}\n${' '.repeat(spaces)}}`;
  }
  return value;
};

const stateActions = {
  new: (element, spaces) => `${' '.repeat(spaces - 2)}+ ${element.key}: ${stringify(element.value, spaces)}`,
  deleted: (element, spaces) => `${' '.repeat(spaces - 2)}- ${element.key}: ${stringify(element.value, spaces)}`,
  nested: (element, spaces, newDepth, rendering) => `${' '.repeat(spaces)}${element.key}: ${rendering(element.children, newDepth)}`,
  unchanged: (element, spaces) => `${' '.repeat(spaces)}${element.key}: ${stringify(element.value, spaces)}`,
  changed: (element, spaces) => `${' '.repeat(spaces - 2)}+ ${element.key}: ${stringify(element.newValue, spaces)}\n${' '.repeat(spaces - 2)}- ${element.key}: ${stringify(element.oldValue, spaces)}`,
};

const render = (ast, depth = 1) => {
  const newDepth = depth + 1;
  const spaces = spacesNumber * depth;
  const previousDepthSpaces = spacesNumber * (depth - 1);
  const preRender = ast.map((element) => {
    const getState = stateActions[element.state];
    return getState(element, spaces, newDepth, render);
  }).join('\n');
  return `{\n${preRender}\n${' '.repeat(previousDepthSpaces)}}`;
};

export default render;
