import './style.css'
import Tesseract from 'tesseract.js';


// Get references to the video and canvas elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.addEventListener('click', ()=>captureFrame());
// Access the camera feed
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      video.srcObject = stream;
    })
    .catch(function(error) {
      console.error('Error accessing the camera:', error);
    });
} else {
  console.error('getUserMedia is not supported by this browser.');
}


// Continuously capture and process video frames
function captureFrame() {
  // Draw the video frame onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Extract the image data from the canvas
  const imageData = canvas.toDataURL('image/png', "image/octet-stream");

  // Process the image data using OCR library or API
  console.log('pre');
  processImage(imageData);

  // Schedule the next frame capture
//   requestAnimationFrame(captureFrame);
}

// Start capturing video frames
// video.addEventListener('play', function() {
//   // Schedule the first frame capture
//   requestAnimationFrame(captureFrame);
// });

function processImage(imageData) {
  Tesseract.recognize(imageData)
    .then(function(result) {
      const text = result.data.text;
      console.log('post',text, result);
      // Do something with the extracted text
      // For example, display it in an output element
      const output = document.getElementById('output');
      output.innerHTML = text;
    },'ita')
    .catch(function(error) {
      console.error('Error processing image:', error);
    });
}