const Jimp = require('jimp');

async function large(image, width, height) {
  const SCALE_FACTOR = 1.5;

  image
    .cover(width / SCALE_FACTOR, height / SCALE_FACTOR)
    .quality(100)
    .write(`output_large.jpg`);

  return 'Finished processing large image';
}

async function medium(image, width, height) {
  const SCALE_FACTOR = 2.5;

  image
    .cover(width / SCALE_FACTOR, height / SCALE_FACTOR)
    .quality(100)
    .write(`output_medium.jpg`);

  return 'Finished processing medium image';
}

async function small(image, width, height) {
  const SCALE_FACTOR = 5;

  image
    .cover(width / SCALE_FACTOR, height / SCALE_FACTOR)
    .quality(100)
    .write(`output_small.jpg`);

  return 'Finished processing small image';
}

async function go() {
  const image = await Jimp.read('input.jpg');
  const width = image.getWidth();
  const height = image.getHeight();

  const promises = [
    small(image, width, height),
    medium(image, width, height),
    large(image, width, height),
  ];

  Promise.all(promises).then(message => {
    console.log(message, '\x1b[43m', 'Done processing images ');
  });
}

go();
