import fs from 'fs';
import fsp from 'fs-promise';

const exportTemplate = (dependency) =>
`export { default } from '${dependency}';
export * from '${dependency}';\n`;

export default () => {
  const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const packageName = packageInfo.name;
  const dependencies = Object.keys(packageInfo.dependencies);

  // eslint-disable-next-line
  console.warn(`\x1b[32mExporting dependencies from ${packageName}...\x1b[0m`);

  const works = [];
  dependencies.forEach((dependency) => {
    const dir = `./${dependency}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (!fs.existsSync(`${dir}/.exported`)) {
      const exportContent = exportTemplate(dependency);
      const work = fsp.writeFile(`${dir}/index.js`, exportContent)
        .then(() => {
          fsp.writeFile(`${dir}/.exported`, '');
          // eslint-disable-next-line
          console.warn(`\x1b[34mDependency exported: ${dependency}\x1b[0m`);
        })
        .catch((error) => {
          throw new Error(error);
        });
      works.push(work);
    }
  });

  Promise.all(works)
    .then(() => {
      // eslint-disable-next-line
      console.warn(`\x1b[32mAll dependencies exported.\x1b[0m`);
      // eslint-disable-next-line
      console.warn(`\x1b[32mYou can use the dependencies from other apps or packages by using:\n\`import [...] from 'meteor/${packageName}/[DEPENDENCY]'\`\x1b[0m`);
    });
};
