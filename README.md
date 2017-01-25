# pathable-vendor
This repository contains the dependencies used across Pathable's apps and packages.

## Dependency Management
Be sure you've installed `yarn` locally.

Installing/Uninstalling dependencies via `yarn` or `npm` will automatically run a script exporting the current state of the package modules.

### Add a new dependency
With `yarn`,

`yarn add [NPM_DEP]`

With `npm`,
```
npm install [NPM_DEP] --save
npm install  // needed for running the exporting script
```

### Remove a dependency
With `yarn`,
```
yarn remove [NPM_DEP]
yarn install  // needed for running the clearing script
```

With `npm`,
```
npm uninstall [NPM_DEP] --save
npm install  // needed for running the clearing script
```
