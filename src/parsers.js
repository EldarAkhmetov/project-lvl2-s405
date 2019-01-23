import YAML from 'js-yaml';
import INI from 'ini';

const formatFuncs = {
  '.json': JSON.parse,
  '.yml': YAML.safeLoad,
  '.ini': INI.parse,
};

export default (format, data) => {
  const parse = formatFuncs[format];
  return parse(data.toString());
};
