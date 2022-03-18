#!/usr/bin/env node
import { program } from 'commander';
import getDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const defaultFormat = program.opts().format;
    const diff = getDiff(filepath1, filepath2, defaultFormat);
    console.log(diff);
  });
program.parse();
