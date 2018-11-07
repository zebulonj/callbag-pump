const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const gzipSize = require('gzip-size')
const pkg = require('../package.json')

const main = path.resolve(__dirname, '..', pkg.module);
const { code: minified } = minify(
  fs.readFileSync(main, 'utf-8'),
  { toplevel: true },
);

const readme = path.join(__dirname, '../README.md');
const data = fs.readFileSync(readme, 'utf-8');
const updated = data.replace(
  /<span class="weight">(.*?)<\/span>/,
  `<span class="weight">${gzipSize.sync(minified)}</span>`
)
fs.writeFileSync(readme, updated)
