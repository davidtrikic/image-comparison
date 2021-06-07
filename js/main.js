
// Components
const imagesContainer = document.getElementById('images-container');
const overlayDiv = document.getElementById('image-overlay');
const overlayImg = document.getElementById('overlay-img');
const img_base = document.getElementById('image_1');
const sliderButton = document.getElementById('slider-button');

let border = 8;
let pos = 0;

// Set the width of overlay image to match the initial container size
overlayImg.style.width = imagesContainer.offsetWidth - 8 + "px";

// Main function call on page load
window.addEventListener('onload', compareImages(overlayDiv));

function compareImages(imgDiv) {

  // Set the width of overlay image to match the container width on window resize
  window.addEventListener('resize', function() {
    overlayImg.style.width = imagesContainer.offsetWidth - border + "px";

    if (pos > imagesContainer.offsetWidth) {
      imgSlider.style.left = imagesContainer.offsetWidth - (imgSlider.offsetWidth / 2) + "px";
      overlayDiv.style.width = imagesContainer.offsetWidth - border + "px";
  }});

  var imgSlider, imgDiv, isClicked = 0, imgDiv_width, imgDiv_height;
  // Store overlay div width and height
  imgDiv_width = imgDiv.offsetWidth;
  imgDiv_height = imgDiv.offsetHeight;
  // Set the overlay div to 50% width
  imgDiv.style.width = (imgDiv_width / 2) + "px";
  // Create slider
  imgSlider = document.createElement("div");
////////
  imgSlider.setAttribute("class", "image-slider slider-position");
  // Insert slider
  imgDiv.parentElement.insertBefore(imgSlider, imgDiv);
  // Position the slider
  imgSlider.style.top = (imgDiv_height / 2) - (imgSlider.offsetHeight / 2) + "px";
  imgSlider.style.left = (imgDiv_width / 2) - (imgSlider.offsetWidth / 2) + "px";
  // Activate slider on mouse click
  imgSlider.addEventListener("mousedown", sliderStart);
  // Deactivacte slider when mouse button is not clicked
  window.addEventListener("mouseup", sliderStop);
  // Activate slider on touch screens
  imgSlider.addEventListener("touchstart", sliderStart);
  // Deactivate slider on touch screens
  window.addEventListener("touchend", sliderStop);

  sliderButton.addEventListener("click", switchSlider);

  function switchSlider() {
    if (imgSlider.classList.contains('image-slider')) {
      imgSlider.classList.remove('image-slider');
      imgSlider.classList.add('image-slider_2');
    } else {
      imgSlider.classList.remove('image-slider_2');
      imgSlider.classList.add('image-slider');
    }
    imgSlider.style.top = (imgDiv_height / 2) - (imgSlider.offsetHeight / 2) + "px";
    imgSlider.style.left = imgDiv.offsetWidth - (imgSlider.offsetWidth / 2 + 2) + "px";
  }

  function sliderStart(e) {
    // Prevent any actions on a apge while slider is active
    e.preventDefault();
    // Set slider state to clicked
    isClicked = 1;
    // Execute a function when the slider is moved
    window.addEventListener("mousemove", moveSlider);
    window.addEventListener("touchmove", moveSlider);
  }

  // Stop the slider if the button is no longer clicked
  function sliderStop() {
    isClicked = 0;
  }

  function moveSlider(e) {
 
    // Exit the function if the slider is no longer clicked
    if (isClicked == 0) return false;
    // Get the cursor's X position
    // If the type of event is mousemove get cursor position, if not get touch position
    if(e.type == "mousemove") {
      pos = getCursorPos(e);
    } else {
      pos = getTouchPos(e);
    };
    // Prevent the slider control from eing positioned outside of the image container
    if (pos < 0) pos = 0;
    if (pos > imagesContainer.offsetWidth) pos = imagesContainer.offsetWidth;

    // Execute a function that will resize the overlay image according to the cursor
    slide(pos);
  }

  function getTouchPos(e) {
    var a, x, y = 0;
    e = e || window.event;
    // Get the coordinates of the overlay div element
    a = imgDiv.getBoundingClientRect();
    // Calculate the cursor's X coordinate, relative to the image position
    y = parseInt(e.touches[0].clientX) - a.left;
    // Substract any page scrolling, if any
    x = x - window.pageXOffset;
    return y;
  }

  function getCursorPos(e) {
    var a, x, y = 0;
    e = e || window.event;
    // Get the coordinates of the overlay div element
    a = imgDiv.getBoundingClientRect();
    // Calculate the cursor's X coordinate, relative to the image position
    x = e.pageX - a.left;
    // Substract any page scrolling, if any
    x = x - window.pageXOffset;
    return x;
  }

  function slide(x) {
    // Resize the overlay div
    imgDiv.style.width = x + "px";
    // Set the slider control position one the edge of the overlay image
    imgSlider.style.left = imgDiv.offsetWidth - (imgSlider.offsetWidth / 2 + 2) + "px";
  }
};

// Image upload function

const button_1 = document.getElementById('upload-button-1');
const button_2 = document.getElementById('upload-button-2');

// Execute the function on page load
window.addEventListener('load', imageUpload());



// Image Upload function
function imageUpload() {
    // Add event listener on buttons; Get image's URL on the img src tag
    button_1.addEventListener('change', function(){
        if (this.files && this.files[0]) {
            overlayImg.onload = () => {
                URL.revokeObjectURL(overlayImg.src);
            }
            overlayImg.src = URL.createObjectURL(this.files[0]);
        }
    });

    button_2.addEventListener('change', function(){
        if (this.files && this.files[0]) {
            img_base.onload = () => {
                URL.revokeObjectURL(img_base.src);
            }
            img_base.src = URL.createObjectURL(this.files[0]);
        }
    });
}

// File upload button label customization

const file_1Label = document.getElementById('file-1-label');
const file_2Label = document.getElementById('file-2-label');

button_1.addEventListener('change', function(){
    file_1Label.textContent = this.files[0].name;
});

button_2.addEventListener('change', function(){
    file_2Label.textContent = this.files[0].name;
});

// Add border button 

const borderButton = document.getElementById('border-button');

borderButton.addEventListener('click', function() {
  overlayDiv.classList.toggle('slider-border');
  
  changeLabel();
});

// Change border button label

function changeLabel() {
  if(overlayDiv.classList.contains('slider-border'))
    { borderButton.innerHTML = "Remove border"; }
    else {borderButton.innerHTML = "Add border"};
}

// Reset button
document.getElementById('reset').addEventListener('click', function(){ 
  overlayDiv.style.width = (imagesContainer.offsetWidth / 2) + "px";
  let slider = document.getElementsByClassName('slider-position')[0];
  slider.style.left = (imagesContainer.offsetWidth / 2) - (slider.offsetWidth / 2) + "px";
});
