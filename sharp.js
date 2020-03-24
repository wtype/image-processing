const sharp = require("sharp");

const input = "input.jpg";

function process(size, width) {
  sharp(input)
    .resize({ width })
    .toFile(`output-${size}.jpg`)
    .then(() => {
      return `Done processing ${size} image`;
    })
    .catch(err => console.log(err));
}

async function go() {
  const promises = [
    process("smallest", 600),
    process("small", 750),
    process("medium", 1000),
    process("large", 1500)
  ];

  Promise.all(promises).then(() => {
    console.log("\x1b[33m", "Done processing images ");
  });
}

go();
