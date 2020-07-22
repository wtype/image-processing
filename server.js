const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const image = require('./process');
const webp = require('./webp');
const makeDir = require('./util');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(`ERROR: Only Images Allowed. File failed ${file.originalname}`, false);
}

const upload = multer({
  storage,
  limits: { fileSize: 25e6 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('image');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5500',
      'http://127.0.0.1:5500',
      'http://localhost:5501',
      'http://127.0.0.1:5501',
    ],
  })
);

app.post('/upload', (req, res) => {
  makeDir();

  upload(req, res, err => {
    if (err) {
      console.log(err);
      res.status(415).send('Error uploading!');
    } else {
      console.log(`Uploaded ${req.file.filename}`);
      image.go(req.file.filename);
      webp.go(req.file.filename);
      res.status(201).send('Uploaded');
    }
  });
});

app.use('/', (req, res) => {
  res.json({
    welcome: 'Image Processor from wtype',
  });
});

const port = 9090;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
