let message = "InteractionDesign";
let bigWord = "ZHdK";
let mouseRadius = 250;
let targetRadius = 250;
let bigWordPixels = [];
let bigWordImg;
let gridSpacing = 20;

function preload() {
  font = loadFont('/98_media/fonts/Neue-HaasGroteskDispW0496BlkIt.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Create an off-screen graphics buffer
  bigWordImg = createGraphics(windowWidth, windowHeight);
  bigWordImg.textFont(font);
  bigWordImg.textSize(200); // Adjust size as needed
  bigWordImg.textAlign(CENTER, CENTER);
  bigWordImg.background(0);
  bigWordImg.fill(255);
  bigWordImg.text(bigWord, bigWordImg.width / 2, bigWordImg.height / 2);
  bigWordImg.loadPixels();
}

function draw() {
  background(0);

  mouseRadius = lerp(mouseRadius, targetRadius, 0.1);

  for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
    for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
      let size = 1;

      // Calculate the corresponding pixel in the bigWord image
      let imgX = floor(map(x, 0, width, 0, bigWordImg.width));
      let imgY = floor(map(y, 0, height, 0, bigWordImg.height));
      let pixelIndex = (imgY * bigWordImg.width + imgX) * 4;
      let r = bigWordImg.pixels[pixelIndex];
      let g = bigWordImg.pixels[pixelIndex + 1];
      let b = bigWordImg.pixels[pixelIndex + 2];

      // Check if the pixel is part of the white text
      if (r > 128 && g > 128 && b > 128) {
        fill(255)
        size += 7;
        circle(x, y, size);
      } else {
        fill(255);
        noStroke();
        circle(x, y, size);
      }
    }
  }
}

function mousePressed() {
  targetRadius = 450;
}

function mouseReleased() {
  targetRadius = 250;
}