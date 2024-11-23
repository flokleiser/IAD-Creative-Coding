let bigWord = "ZHdK";
let bigWordImg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);

  // Create the offscreen graphics for the word
  bigWordImg = createGraphics(windowWidth, windowHeight);
  bigWordImg.fill(255);
  bigWordImg.textSize(500);
  bigWordImg.textAlign(CENTER, CENTER);
  bigWordImg.background(0);
  bigWordImg.text(bigWord, bigWordImg.width / 2, bigWordImg.height / 2);
  bigWordImg.loadPixels(); // Load the pixel array for reading
}

function draw() {
  background(0);

  // Optionally display the bigWordImg for debugging
  tint(255, 150);
  image(bigWordImg, 0, 0);
  noTint();

  let gridSpacing = 20; // Spacing between circles

  for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
    for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
      // Map canvas coordinates to the bigWordImg coordinates
      let imgX = floor(map(x, 0, width, 0, bigWordImg.width));
      let imgY = floor(map(y, 0, height, 0, bigWordImg.height));
      let pixelIndex = (imgY * bigWordImg.width + imgX) * 4;

      // Read pixel values
      let r = bigWordImg.pixels[pixelIndex];
      let g = bigWordImg.pixels[pixelIndex + 1];
      let b = bigWordImg.pixels[pixelIndex + 2];

      // Calculate brightness (0 to 255)
      let brightness = (r + g + b) / 3;

      // Map brightness to circle size (larger circles for darker areas)
      let size = map(brightness, 0, 255, gridSpacing, 2);

      // Draw circle
      fill(255);
      noStroke();
      circle(x, y, size);
    }
  }
}
