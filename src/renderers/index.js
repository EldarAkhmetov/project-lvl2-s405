import standart from './standartRenderer';
import plain from './plainRenderer';

const chooseRenderer = {
  standart,
  plain,
};

export default format => chooseRenderer[format];
