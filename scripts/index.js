import program from 'commander';

import exportModules from './export-modules';

program
  .version('0.0.1')
  .command('export-modules')
  .action(exportModules);

program.parse(process.argv);
