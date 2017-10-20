import fs from 'fs';
import fsp from 'fs-promise';
import jsdom from './jsdom';

jsdom();

const TAB = '  ';
const subDependencies = ['react-dom/server', 'react-dom/test-utils'];
const dependenciesToSkip = ['filepicker-js', 'node-sass', 'react-rnd'];

const exportTemplate = dependency => {
  const defaultTemplate = `export { default } from '${dependency}';`;
  const allModuleTemplate = `export * from '${dependency}';\n`;
  if (dependenciesToSkip.includes(dependency)) {
    return `${defaultTemplate}\n${allModuleTemplate}`;
  }
  const module = require(dependency);
  let submodules = '*';
  try {
    submodules = Object.keys(module);
    if (submodules.length === 0 || module.default) {
      return `${defaultTemplate}\n${allModuleTemplate}`;
    }
    submodules = submodules.join(`,\n${TAB}`);
  } catch (e) {
    return `${defaultTemplate}\n${allModuleTemplate}`;
  }
  const exportContent = `\n${TAB}${submodules},\n`;
  const moduleTemplate = `export {${exportContent}} from '${dependency}';\n`;
  return `${defaultTemplate}\n${moduleTemplate}`;
};

const successExport = (dependency, dir) => {
  fsp.writeFile(`${dir}/.exported`, '');
  // eslint-disable-next-line
  console.warn(`\x1b[34mDependency exported: ${dependency}\x1b[0m`);
};

export default () => {
  const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const packageName = packageInfo.name;
  const dependencies = [...subDependencies, ...Object.keys(packageInfo.dependencies)];

  // eslint-disable-next-line
  console.warn(`\x1b[32mExporting dependencies from ${packageName}...\x1b[0m`);

  const works = [];
  dependencies.forEach(dependency => {
    const dir = `./${dependency}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const shouldExport = true;
    if (shouldExport) {
      const exportContent = exportTemplate(dependency);
      const work = fsp
        .writeFile(`${dir}/index.js`, exportContent)
        .then(() => {
          successExport(dependency, dir);
        })
        .catch(error => {
          throw new Error(error);
        });
      works.push(work);
    }
  });

  Promise.all(works).then(() => {
    // eslint-disable-next-line
    console.warn(`\x1b[32mAll dependencies exported.\x1b[0m`);
    // eslint-disable-next-line
    console.warn(
      `\x1b[32mYou can use the dependencies from other apps or packages by using:\n\`import [...] from 'meteor/${packageName}/[DEPENDENCY]'\`\x1b[0m`
    );
  });
};
