let bigWord = "ZHdK";
let gridSpacing = 50;
let bigWordImg;
let font;

function preload() {
  font = loadFont('/98_media/fonts/Neue-HaasGroteskDispW0496BlkIt.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  textFont(font);

  // Create the graphics object and draw the text
  bigWordImg = createGraphics(windowWidth, windowHeight);
  bigWordImg.textFont(font);
  bigWordImg.textSize(windowWidth / 3);
  bigWordImg.textAlign(CENTER, CENTER);
  bigWordImg.background(0);
  bigWordImg.fill(255);
  bigWordImg.text(bigWord, bigWordImg.width / 2, bigWordImg.height / 2);
  bigWordImg.loadPixels(); // Ensure pixels are loaded after drawing the text
}

function draw() {
  background(0);

  // Adjust grid spacing based on window dimensions
  if (windowHeight < windowWidth) {
    gridSpacing = windowHeight / 35;
  } else {
    gridSpacing = windowWidth / 35;
  }

  // Render the grid based on the pixel data
  for (let y = 0; y < height; y += gridSpacing) {
    for (let x = 0; x < width; x += gridSpacing) {
      let pixelIndex = 4 * (y * bigWordImg.width + x);
      let r = bigWordImg.pixels[pixelIndex];
      let g = bigWordImg.pixels[pixelIndex + 1];
      let b = bigWordImg.pixels[pixelIndex + 2];
      let a = bigWordImg.pixels[pixelIndex + 3];

      // Check if the pixel is part of the text (white)
      if (r > 128 && g > 128 && b > 128 && a > 128) {
        fill(255);
        ellipse(x, y, gridSpacing / 2);
      }
    }
  }
}