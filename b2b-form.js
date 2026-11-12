const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  console.info(`Building forms`);

  const files = [
    `./dist/revature-forms/browser/polyfills.js`,
    `./dist/revature-forms/browser/main.js`
  ]

  await fs.ensureDir('./dist/revature-forms/browser')
  await fs.ensureDir('./forms');
  await concat(files, './forms/b2b-form.js')

  // Load-once guard: the Webflow "b2b form" component carries this script, so a page
  // with two forms loads it twice. A second copy re-runs zone.js and breaks both forms.
  const bundle = await fs.readFile('./forms/b2b-form.js', 'utf8');
  const guarded =
    '(function () {\n' +
    'if (window.__revatureB2bFormLoaded) { return; }\n' +
    'window.__revatureB2bFormLoaded = true;\n' +
    bundle +
    '\n})();\n';
  await fs.writeFile('./forms/b2b-form.js', guarded);

  await fs.copy('./forms/b2b-form.js', './forms/b2b-form.txt');
  console.info('Forms created successfully!')
})()
