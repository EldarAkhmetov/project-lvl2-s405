#!/usr/bin/env node

import program from 'commander';

program
  .description('Compares two configuration files and shows difference')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondCoifig>')
  .parse(process.argv);
