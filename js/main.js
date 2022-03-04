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

    // if user cancels upload, which generates an error
  } catch (e) {
    if (e instanceof DOMException) {
      imgRef.src = 'images/srcimgref.png';
    } else {
      throw e;
    }
  }
}

// var url = 'http://colormind.io/api/';
// var data = {
//   model: 'default',
//   input: ['N', 'N', 'N', 'N', 'N']
//   // 'black-forest.jpg'
//   // $srcimg.getAttribute('src')
//   // input: ['N', 'N', 'N', 'N', 'N']
// };

// var http = new XMLHttpRequest();

// http.onreadystatechange = function () {
//   if (http.readyState === 4 && http.status === 200) {
//     var palette = JSON.parse(http.responseText).result;
//     swatches(palette);
//   }
// };
// http.open('POST', url, true);
// http.send(JSON.stringify(data));

// function swatches(palette) {
//   var $color1 = document.querySelector('.color1');
//   var $code1 = document.querySelector('.code1');
//   $code1.textContent = palette[0];
//   $color1.setAttribute('style', 'background-color: rgba(' + palette[0][0] + ', ' + palette[0][1] + ', ' + palette[0][2] + ', 1)');
//   var $color2 = document.querySelector('.color2');
//   var $code2 = document.querySelector('.code2');
//   $code2.textContent = palette[1];
//   $color2.setAttribute('style', 'background-color: rgba(' + palette[1][0] + ', ' + palette[1][1] + ', ' + palette[1][2] + ', 1)');
//   var $color3 = document.querySelector('.color3');
//   var $code3 = document.querySelector('.code3');
//   $code3.textContent = palette[2];
//   $color3.setAttribute('style', 'background-color: rgba(' + palette[2][0] + ', ' + palette[2][1] + ', ' + palette[2][2] + ', 1)');
//   var $color4 = document.querySelector('.color4');
//   var $code4 = document.querySelector('.code4');
//   $code4.textContent = palette[3];
//   $color4.setAttribute('style', 'background-color: rgba(' + palette[3][0] + ', ' + palette[3][1] + ', ' + palette[3][2] + ', 1)');
//   var $color5 = document.querySelector('.color5');
//   var $code5 = document.querySelector('.code5');
//   $code5.textContent = palette[4];
//   $color5.setAttribute('style', 'background-color: rgba(' + palette[4][0] + ', ' + palette[4][1] + ', ' + palette[4][2] + ', 1)');
// }
