let message = "InteractionDesign";
let bigWord = "ZHdK"
let mouseRadius = 200;
let targetRadius = 200;
let bigWordPixels = [];
let logoImg;
let imgAspectRatio;
let imgWidth, imgHeight;


function preload() {
  font = loadFont('assets/Neue-HaasGroteskDispW0496BlkIt.otf');
  // logoImg = loadImage('assets/logo_slim.png');
  logoImg = loadImage('assets/logo_slim_square.png');
}

function setup() {
  //looks good: 1337 884
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  textFont(font);
  pixelDensity(1)

  if (windowHeight < windowWidth) {
    gridSpacing = windowHeight/50;
  } else {
    gridSpacing = windowWidth/50;
  }

  console.log(gridSpacing)

  imgAspectRatio = logoImg.height / logoImg.width;

  imgWidth = gridSpacing * 45 
  imgHeight = imgWidth

    logoImg.resize(windowWidth,windowHeight)
    logoImg.pixelDensity(1)
    logoImg.loadPixels();
}

function draw() {
  background(0);
  let index = 0;

  mouseRadius = lerp(mouseRadius, targetRadius, 0.2);

    for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
      for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
        let letter = message[index % message.length];
        fill(255);
        stroke(255)

        let distance = dist(mouseX, mouseY, x, y);
        let size = gridSpacing/width;

        let imgX = constrain(
          floor(map(x, (width - imgWidth) / 2, (width + imgWidth) / 2, 0, logoImg.width)),
          0,
          logoImg.width - 1
        );
        let imgY = constrain(
          floor(map(y, (height - imgHeight) / 2, (height + imgHeight) / 2, 0, logoImg.height)),
          0,
          logoImg.height - 1
        );

        let pixelIndex = (imgY * logoImg.width + imgX) * 4;
        let r = logoImg.pixels[pixelIndex];
        let g = logoImg.pixels[pixelIndex + 1];
        let b = logoImg.pixels[pixelIndex + 2];



          if (distance < mouseRadius) {
            if (r < 128 && g < 128 && b < 128) {
              size += map(distance, 0, mouseRadius, 7, 2);
            } else {
              size = 0.5 
            }
          } else {
            size += 3;
            // size += 2 
          }

        textSize(size * 4);
        text(letter, x, y - (textAscent() + textDescent()) / 4);
        index++;
    }
  }
}

function mousePressed() { 
  targetRadius = 500;
}

function mouseReleased() { 
  targetRadius = 100;
}