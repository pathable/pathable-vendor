# pathable-vendor
This repository contains the dependencies used across Pathable's apps and packages.

## Dependencies management
Be sure to have installed `yarn` in your env.

Installing/Uninstalling dependencies via `yarn` or `npm` will automatically run a script for exporting the current state of modules on the package.

### Add a new dependency
With `yarn`,

`yarn add [NPM_DEP]`

With `npm`,
```
npm install [NPM_DEP] --save`
npm install  // needed for running the exporting script
```

### Remove dependencies
With `yarn`,
```
yarn remove [NPM_DEP]`
yarn install  // needed for running the clearing script
```

With `npm`,
```
npm uninstall [NPM_DEP] --save`
npm install  // needed for running the clearing script
```
