import { safeLoad } from 'js-yaml';

const formatFuncs = {
  '.json': JSON.parse,
  '.yml': safeLoad,
};

export default (format, data) => {
  const parse = formatFuncs[format];
  return parse(data);
};
