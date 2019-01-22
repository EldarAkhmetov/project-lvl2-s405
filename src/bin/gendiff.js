#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .description('Compares two configuration files and shows difference')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondCoifig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
