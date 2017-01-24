import program from 'commander';

import exportModules from './export-modules';
import clearModules from './clear-modules';

program
  .version('0.0.1')
  .command('export-modules')
  .action(exportModules);

program
  .version('0.0.1')
  .command('clear-modules')
  .action(clearModules);

program.parse(process.argv);
