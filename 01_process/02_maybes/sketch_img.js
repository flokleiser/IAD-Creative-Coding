let message = "InteractionDesign";
let bigWord = "ZHdK"
let mouseRadius = 200;
let targetRadius = 200;
let bigWordPixels = [];
let logoImg;
let imgAspectRatio;
let imgWidth, imgHeight;

function preload() {
  font = loadFont('/98_media/fonts/Neue-HaasGroteskDispW0496BlkIt.otf');
  // logoImg = loadImage('/98_media/logos/slim/logo_slim_square.png');
  logoImg = loadImage('/98_media/logos/slim/test.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  textFont(font);

  let gridSpacing = (windowWidth/60) + (windowHeight/60)/2;

  imgHeight = floor(windowHeight / 1.35 / gridSpacing) * gridSpacing;
  imgWidth = imgHeight;  

  logoImg.resize(imgWidth, imgHeight);
  logoImg.resize(1000,1000)

  logoImg.loadPixels();
}

function draw() {
  background(0);
  let index = 0;
  let gridSpacing = (windowWidth/60) + (windowHeight/60)/2;

  // tint(255, 51);
  // image(logoImg, (width - imgWidth) / 2, (height - imgHeight) / 2, imgWidth, imgHeight);
  // noTint()

  mouseRadius = lerp(mouseRadius, targetRadius, 0.1);

    for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
      for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
        if (x < (width - imgWidth) / 2 || x > (width + imgWidth) / 2 || y < (height - imgHeight) / 2 || y > (height + imgHeight) / 2) {
          continue;
        }
        let letter = message[index % message.length];
        fill(255);
        stroke(255)

        let distance = dist(mouseX, mouseY, x, y);
        let size = gridSpacing/width;

        let imgX = floor(map(x, (width - imgWidth) / 2, (width + imgWidth) / 2, 0, logoImg.width));
        let imgY = floor(map(y, (height - imgHeight) / 2, (height + imgHeight) / 2, 0, logoImg.height));

        let pixelIndex = (imgY * logoImg.width + imgX) * 4;
        let r = logoImg.pixels[pixelIndex];
        let g = logoImg.pixels[pixelIndex + 1];
        let b = logoImg.pixels[pixelIndex + 2];

          if (distance < mouseRadius) {
            if (r < 128 && g < 128 && b < 128) {
              size += map(distance, 0, mouseRadius, 10, 2);
            } else {
              size -= 1
            }
          } else {
            size += 4
          }

        textSize(size * 4);
        text(letter, x, y - (textAscent() + textDescent()) / 4);
        index++;
    }
  }
}

function mousePressed() { 
  targetRadius = 700;
}

function mouseReleased() { 
  targetRadius = 200;
}