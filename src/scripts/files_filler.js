function fileFilling() {
  var fileInputs, inputClone, file, attrs;

  fileInputs = document.querySelectorAll('input[type=file]');
  attributes = ['id', 'name', 'type'];

  if (fileInputs != null) {
    fileInputs.forEach(function(input) {
      inputClone = document.createElement('input');

      attributes.forEach(function(attr) {
        inputClone.setAttribute(attr, input.getAttribute(attr));
      });

      createFile(input, inputClone);
    });
  }
}

function isPhotoInput(input) {
  var value = 0;

  ['photo', 'image', 'picture'].forEach(function(word) {
    value = value + input.name.includes(word);
  });

  return (value === 1)
}

function createFile(input, clone) {
  if (isPhotoInput(input)) {
    createRandomPhoto(input, clone)
  } else {
    clone.files = new fakeFileList(createFakeFile());
    replaceInput(input, clone);
  }
}

function createRandomPhoto(input, clone) {
  var photo, value, xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://picsum.photos/200', true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    value = new Uint8Array(this.response);
    photo = new File([new Blob([value], { type: "image/png" })], 'foo.png');

    clone.files = new fakeFileList(photo);
    replaceInput(input, clone);
  };

  xhr.send();
}

function createFakeFile() {
  var pdf = new jsPDF();
  pdf.text(20, 20, "Probably the most informative pdf you've ever read");

  return new File([pdf.output('blob')], 'foo.pdf');
}

function fakeFileList(file) {
  var fakeList = [file];

  for (var c, b = c = fakeList.length, d = !0; b-- && d;) {
    d = fakeList[b] instanceof File;
  }

  for (b = (new ClipboardEvent('')).ClipboardData || new DataTransfer; c--;) {
    b.items.add(fakeList[c])
  }

  return b.files
}

function replaceInput(input, clone) {
  input.parentElement.appendChild(clone);
  input.remove();
}

fileFilling();
