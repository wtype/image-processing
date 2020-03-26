const sharp = require('sharp');
const makeDir = require('./util');

function process(filename, size, width) {
  sharp(`./uploads/${filename}`)
    .resize({ width })
    .webp({
      lossless: false,
      quality: 50,
    })
    .toFile(
      `./processed-webp/${filename.replace(
        /.jpg|.jpeg|.png|.gif/gi,
        ''
      )}-${size}.webp`
    )
    .then(() => `Done processing ${size} image`)
    .catch(err => console.log(err));
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

  Promise.all(promises).then(() => {
    console.log('\x1b[33m', 'Done processing images as WebP ');
  });
}

module.exports = {
  process,
  go,
};
