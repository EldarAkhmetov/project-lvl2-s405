const valueRenderer = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return (typeof value === 'string' && !parseInt(value, 10)) ? `'${value}'` : value;
};

const stateActions = {
  new: (element, previousProp) => `Property '${previousProp}${element.key}' was added with value: ${valueRenderer(element.value)}`,
  deleted: (element, previousProp) => `Property '${previousProp}${element.key}' was removed`,
  nested: (element, previousProp, format) => `${format(element.children, `${previousProp}${element.key}.`)}`,
  unchanged: (element, previousProp) => `Property '${previousProp}${element.key}' was unchanged`,
  changed: (element, previousProp) => `Property '${previousProp}${element.key}' was updated. From ${valueRenderer(element.oldValue)} to ${valueRenderer(element.newValue)}`,
};

const render = (ast, previousProp = '') => {
  const preRender = ast.map((element) => {
    const getState = stateActions[element.state];
    return getState(element, previousProp, render);
  });
  return preRender.join('\n');
};

export default render;
