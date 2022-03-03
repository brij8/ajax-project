// event listener on upload button, open file explorer
var $upload = document.querySelector('.upload');
$upload.addEventListener('click', getFile);

const fileTypeOptions = {
  types: [
    {
      description: 'Images',
      accept: {
        'image/*': ['.png', '.gif', '.jpeg', '.jpg']
      }
    }
  ],
  excludeAcceptAllOption: true,
  multiple: false
};

async function getFile() {

  // assign img element to var
  var imgRef = document.querySelector('.src-img');

  try {
    // open file picker
    var [fileHandle] = await window.showOpenFilePicker(fileTypeOptions);

    // get file contents
    const srcImage = await fileHandle.getFile();

    // make a URL for image file on local dir
    var imgURL = URL.createObjectURL(srcImage);

    // assign that URL to src of img element
    imgRef.src = imgURL;

  } catch (e) {
    if (e instanceof DOMException) {
      imgRef.src = 'images/srcimgref.png';
    } else {
      throw e;
    }
  }
}
