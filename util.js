const fs = require('fs');

function makeDir() {
  if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
  if (!fs.existsSync('./processed')) fs.mkdirSync('./processed');
  if (!fs.existsSync('./processed-webp')) fs.mkdirSync('./processed-webp');
}

module.exports = makeDir;
