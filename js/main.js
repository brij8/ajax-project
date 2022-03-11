/* exported data */
//
// ***** upload button: on click open file picker  *****
//
// listen for click, call getFile to open file explorer
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

// ***** color picker: click swatch to bring up picker *****
// close picker to assign color to swatch & color-code to code span

// grab the pickers
var $colorpicker1 = document.getElementById('colorpicker1');
var $colorpicker2 = document.getElementById('colorpicker2');
var $colorpicker3 = document.getElementById('colorpicker3');
var $colorpicker4 = document.getElementById('colorpicker4');
var $colorpicker5 = document.getElementById('colorpicker5');

// listen for input on each picker element
$colorpicker1.addEventListener('input', setColor);
$colorpicker2.addEventListener('input', setColor);
$colorpicker3.addEventListener('input', setColor);
$colorpicker4.addEventListener('input', setColor);
$colorpicker5.addEventListener('input', setColor);

// listen for change (when clicking away/closing picker) on each picker element
$colorpicker1.addEventListener('change', setCode);
$colorpicker2.addEventListener('change', setCode);
$colorpicker3.addEventListener('change', setCode);
$colorpicker4.addEventListener('change', setCode);
$colorpicker5.addEventListener('change', setCode);

// on input, set .color# bg color to input color value
function setColor(event) {
  this.parentElement.style.backgroundColor = event.target.value;
}

// on change/close, assign the color-code to the 'codes' span
function setCode(event) {
  this.parentElement.nextSibling.nextSibling.childNodes[1].textContent =
  this.parentElement.style.backgroundColor.slice(4, this.parentElement.style.backgroundColor.length - 1);
}

// ***** hold button toggles: *****

var $hold1 = document.querySelector('.hold-btn1');
var $hold2 = document.querySelector('.hold-btn2');
var $hold3 = document.querySelector('.hold-btn3');
var $hold4 = document.querySelector('.hold-btn4');
var $hold5 = document.querySelector('.hold-btn5');

$hold1.addEventListener('click', holdBtnToggle);
$hold2.addEventListener('click', holdBtnToggle);
$hold3.addEventListener('click', holdBtnToggle);
$hold4.addEventListener('click', holdBtnToggle);
$hold5.addEventListener('click', holdBtnToggle);

function holdBtnToggle(event) {
  if (this.getAttribute('holding') === 'true') {
    this.setAttribute('holding', false);
    this.parentElement.previousSibling.previousSibling.childNodes[1].className = 'enabled';
  } else {
    this.setAttribute('holding', true);
    this.parentElement.previousSibling.previousSibling.childNodes[1].className = 'disabled';
  }
}

// ***** generate button: on click, generate a fresh palette *****

// listen for click, call genPalette
var $gen = document.querySelector('.generate');
$gen.addEventListener('click', genPalette);

// build data object for api, send it, assign returned array to palette display
function genPalette(event) {

  var tempData = {
    model: 'default',
    input: ['N', 'N', 'N', 'N', 'N']
  };

  // grab all the hold buttons and loop through them
  var $heldColors = document.querySelectorAll('.hold-button');
  for (let i = 0; i < $heldColors.length; i++) {
    // if held is selected, get bg color & assign to variable (is a string of numbers)
    if ($heldColors[i].getAttribute('holding') === 'true') {
      var colorcode = $heldColors[i].previousSibling.previousSibling.textContent;
      // split string to make an array of #s as strings
      var ccStrArray = colorcode.split(' ');
      // parseInt each index, push to new array of #s as integers
      var ccIntArray = [];
      ccStrArray.forEach(item => {
        ccIntArray.push(parseInt(item));
      });
      // array of #s as integers asigned to tempData[i]
      tempData.input[i] = ccIntArray;
    } else {
      // if held not selected, assign 'N' to array
      tempData.input[i] = 'N';
    }
  }

  var url = 'http://colormind.io/api/';
  var data = tempData;

  var http = new XMLHttpRequest();

  http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      var palette = JSON.parse(http.responseText).result;
      swatches(palette);
    }
  };
  http.open('POST', url, true);
  http.send(JSON.stringify(data));

  function swatches(palette) {
    var $color1 = document.querySelector('.color1');
    var $code1 = document.querySelector('.code1');
    $code1.textContent = palette[0][0] + ', ' + palette[0][1] + ', ' + palette[0][2];
    $color1.setAttribute('style', 'background-color: rgba(' + palette[0][0] + ', ' + palette[0][1] + ', ' + palette[0][2] + ', 1)');
    var $color2 = document.querySelector('.color2');
    var $code2 = document.querySelector('.code2');
    $code2.textContent = palette[1][0] + ', ' + palette[1][1] + ', ' + palette[1][2];
    $color2.setAttribute('style', 'background-color: rgba(' + palette[1][0] + ', ' + palette[1][1] + ', ' + palette[1][2] + ', 1)');
    var $color3 = document.querySelector('.color3');
    var $code3 = document.querySelector('.code3');
    $code3.textContent = palette[2][0] + ', ' + palette[2][1] + ', ' + palette[2][2];
    $color3.setAttribute('style', 'background-color: rgba(' + palette[2][0] + ', ' + palette[2][1] + ', ' + palette[2][2] + ', 1)');
    var $color4 = document.querySelector('.color4');
    var $code4 = document.querySelector('.code4');
    $code4.textContent = palette[3][0] + ', ' + palette[3][1] + ', ' + palette[3][2];
    $color4.setAttribute('style', 'background-color: rgba(' + palette[3][0] + ', ' + palette[3][1] + ', ' + palette[3][2] + ', 1)');
    var $color5 = document.querySelector('.color5');
    var $code5 = document.querySelector('.code5');
    $code5.textContent = palette[4][0] + ', ' + palette[4][1] + ', ' + palette[4][2];
    $color5.setAttribute('style', 'background-color: rgba(' + palette[4][0] + ', ' + palette[4][1] + ', ' + palette[4][2] + ', 1)');
  }
}
