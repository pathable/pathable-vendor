Package.describe({
  name: 'pathable-vendor',
  version: '0.0.1',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.1');
  api.use('ecmascript');
});
