import fs from 'fs';
import fsp from 'fs-extra-promise';

const excludedFolders = ['node_modules', 'scripts'];

export default () => {
  const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const packageName = packageInfo.name;
  const dependencies = Object.keys(packageInfo.dependencies);

  // eslint-disable-next-line
  console.warn(`\x1b[32mClearing unused dependencies exports from ${packageName}...\x1b[0m`);

  const works = [];
  fs.readdir('./', (err, files) => {
    if (err) throw new Error(err);

    files.forEach((file) => {
      if (fs.existsSync(file)
        && fs.statSync(file).isDirectory()
        && !excludedFolders.includes(file)
        && fs.existsSync(`${file}/.exported`)
        && !dependencies.includes(file)) {
        const work = fsp.remove(file);
        works.push(work);
        // eslint-disable-next-line
        console.warn(`\x1b[34mUnused dependency cleared: ${file}\x1b[0m`);
      }
    });
  });

  Promise.all(works)
    .then(() => {
      // eslint-disable-next-line
      console.warn(`\x1b[32mUnused dependencies exports cleared.\x1b[0m`);
    });
};
