const main = document.querySelector('main');
const form = document.querySelector('form');

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function lighten(e) {
  main.classList.add('lighten');
}

function unLighten(e) {
  main.classList.remove('lighten');
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  main.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
  main.addEventListener(eventName, lighten, false);
});

['dragleave', 'drop'].forEach(eventName => {
  main.addEventListener(eventName, unLighten, false);
});

// function uploadFile(file) {
//   const url = 'http://localhost:9090/process';
//   const formData = new FormData();

//   formData.append('file', file);

//   fetch(url, {
//     method: 'POST',
//     body: formData,
//   })
//     .then(() => {
//       console.log(formData, 'Uploaded file');
//     })
//     .catch(err => {
//       alert('Error, please upload an image.\n\n', err);
//     });
// }

function uploadFile() {
  const { files } = document.querySelector('[type=file]');
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    formData.append('files[]', file);
  }

  fetch('http://localhost:9090/process', {
    method: 'POST',
    body: formData,
  }).then(response => {
    console.log(response);
  });
}

function handleFiles(files) {
  [...files].forEach(uploadFile);
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const { files } = dt;

  handleFiles(files);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  uploadFile();
});
main.addEventListener('drop', handleDrop, false);
