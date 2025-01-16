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
  await concat(files, './forms/sourcing-form.js')
  await fs.copy('./forms/sourcing-form.js', './forms/sourcing-form.txt');
  console.info('Forms created successfully!')
})()
