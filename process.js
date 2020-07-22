const sharp = require('sharp');
const path = require('path');
const makeDir = require('./util');

function process(filename, size, width) {
  sharp(`./uploads/${filename}`)
    .resize({ width })
    .toFile(
      `./processed/${filename
        .replace(/.jpg|.jpeg|.png|.gif/gi, '')
        .replace(/ /g, '_')}-${size}${path.extname(filename)}`
    )
    .then(() => `Done processing ${size} image`)
    .catch(error => new Error(error));
}

async function go(filename) {
  makeDir();

  const promises = [
    process(filename, '400', 400),
    process(filename, '640', 640),
    process(filename, '768', 768),
    process(filename, '1024', 1024),
    process(filename, '1366', 1366),
    process(filename, '1600', 1600),
    process(filename, '1920', 1920),
    process(filename, '2200', 2200),
  ];

  Promise.allSettled(promises).then(results => {
    results.forEach(result => {
      console.log('\x1b[33m', `Processing ${filename} as JPG. Status: ${result.status}`);
    });
  });
}

module.exports = {
  process,
  go,
};
