import fs from 'fs';
import fsp from 'fs-extra-promise';

const excludedFolders = ['node_modules', 'scripts'];

export default () => {
  const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const packageName = packageInfo.name;

  // eslint-disable-next-line
  console.warn(`\x1b[32mClearing dependencies from ${packageName}...\x1b[0m`);

  const works = [];
  fs.readdir('./', (err, files) => {
    if (err) throw new Error(err);

    files.forEach((file) => {
      if (fs.existsSync(file)
        && fs.statSync(file).isDirectory()
        && excludedFolders.indexOf(file) === -1
        && fs.existsSync(`${file}/.exported`)) {
        const work = fsp.remove(file);
        works.push(work);
      }
    });
  });

  Promise.all(works)
    .then(() => {
      // eslint-disable-next-line
      console.warn(`\x1b[32mDependencies cleared.\x1b[0m`);
    });
};
