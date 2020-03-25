const express = require('express');
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5500',
  })
);

app.post('/process', upload.single('image'), (req, res) => {
  try {
    res.send(req.file);
  } catch (error) {
    console.log(error);
  }
  console.log(req.file);
  console.log(res.file);
});

app.use('/', (req, res) => {
  res.json({
    welcome: 'Welcome to the Image Processor',
  });
});

const port = 9090;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
