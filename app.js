const main = document.querySelector('main');

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

function uploadFile(file) {
  const url = 'http://localhost:9090/upload';
  const formData = new FormData();

  formData.append('image', file);

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      console.log('Uploaded');
    })
    .catch(err => {
      console.log('Error, please upload an image.\n\n', err);
    });
}

function handleFiles(files) {
  [...files].forEach(file => uploadFile(file));
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const { files } = dt;

  handleFiles(files);
}

main.addEventListener('drop', handleDrop, false);
