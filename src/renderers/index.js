import standart from './standartRenderer';
import plain from './plainRenderer';

const chooseRenderer = {
  standart,
  plain,
  json: ast => JSON.stringify(ast),
};

export default format => chooseRenderer[format];
