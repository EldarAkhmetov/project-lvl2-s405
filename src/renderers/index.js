import standart from './standartRenderer';
import plain from './plainRenderer';

const chooseRenderer = {
  standart,
  plain,
  json: JSON.stringify,
};

export default format => chooseRenderer[format];
