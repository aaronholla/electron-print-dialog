'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

const Bundler = require('parcel-bundler');
const Path = require('path');
const { exec } = require('child_process');

exec('rm -rf dist', error => {
  if (error) return console.error('Unable to clear the dist folder');
});

const entryFiles = [
  Path.join(__dirname, '../index.html'),
  Path.join(__dirname, '../index.js')
];

const options = {
  outDir: './dist',
  publicUrl: 'replacedotslash',
  watch: false,
  cache: false,
  contentHash: false,
  target: 'electron',
  bundleNodeModules: false,
  logLevel: 3,
  hmr: false,
  hmrHostname: '',
  sourceMaps: false,
  autoInstall: false
};

(function() {
  const bundler = new Bundler(entryFiles, options);

  bundler.on('buildEnd', () => {
    exec(`sed -i '' 's/${options.publicUrl}/./g' ${options.outDir}/index.html`);
  });

  bundler.bundle();
})();
