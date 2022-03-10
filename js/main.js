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

// grab the picker & the wrapper
var $colorpicker = document.getElementById('colorpicker');
var $swatch1 = document.querySelector('.color1');
var $codes = document.querySelector('.codes');

// picker.oninput (open and then when selecting a color from picker)
// picker event value assigned to wrapper background
$colorpicker.oninput = function () {
  $swatch1.style.backgroundColor = event.target.value;
};

// picker.onchange (when clicking away/closing picker)
// assign the color-code to the 'codes' span
$colorpicker.onchange = function () {
  $codes.textContent = $swatch1.style.backgroundColor.slice(4, $swatch1.style.backgroundColor.length - 1);
};

// ***** hold buttons; toggles: *****
// off = darkgrey, holding="false"
// on = ltgrey, holding="true" + disable colorpicker for swatch (hide <input type="color">)

var $hold = document.querySelector('.hold-btn');
$hold.addEventListener('click', holdBtnToggle);
function holdBtnToggle(event) {
  if (this.getAttribute('holding') === 'true') {
    this.setAttribute('holding', false);
    $colorpicker.setAttribute('disabled', false);
  } else {
    this.setAttribute('holding', true);
    $colorpicker.setAttribute('disabled', true);
  }
}

// ***** generate button: on click, generate a fresh palette *****
//
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
  var $heldColors = document.querySelectorAll('.hold-btn');
  for (let i = 0; i < $heldColors.length; i++) {
    // if held is selected, get bg color & assign to array
    if ($heldColors[i].getAttribute('holding') === 'true') {
      // .tC will need split & parse int
      var colorcode = $heldColors[i].previousSibling.previousSibling.textContent;
      // console.log('colorcode: ', colorcode); // set of #s as strings
      var ccStrArray = colorcode.split(' ');
      // console.log('ccStrArray: ', ccStrArray); // array of #s as strings

      var ccArray = [];
      // parseInt needs to effect whole array not just 0th, use forEach ?
      ccStrArray.forEach(item => {
        ccArray.push(parseInt(item));
      });
      // var ccArray = parseInt();

      // console.log('ccArray: ', ccArray); // array of #s as integers
      tempData.input[i] = ccArray;
    } else {
      // if held not selected, assign 'N' to array
      tempData.input[i] = 'N';
    }
  }
  // console.log('tempData: ', tempData);

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
