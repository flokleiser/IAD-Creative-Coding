let message = "InteractionDesign";
let bigWord = "ZHdK"
let mouseRadius = 200;
let targetRadius = 200;
let bigWordPixels = [];
let logoImg;
let imgAspectRatio;
let imgWidth, imgHeight;


function preload() {
  font = loadFont('/98_media/Neue-HaasGroteskDispW0496BlkIt.otf');
  // logoImg = loadImage('/98_media/iad_logo.png');
  // logoImg = loadImage('/98_media/iad_logo.png');
  // logoImg = loadImage('/98_media/iad_logo_hd.png');
  logoImg = loadImage('/98_media/iad_logo_new_hd.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  textFont(font);

  imgAspectRatio = logoImg.height / logoImg.width;

  if (windowWidth / windowHeight > logoImg.width / logoImg.height) {
      imgHeight = windowHeight;
      imgWidth = windowHeight / imgAspectRatio;
    } else {
      imgWidth = windowWidth;
      imgHeight = windowWidth * imgAspectRatio;
    }

    logoImg.resize(windowWidth,windowHeight)
    logoImg.loadPixels();
}

function draw() {
  background(0);
  let index = 0;
  let gridSpacing = 20;

  mouseRadius = lerp(mouseRadius, targetRadius, 0.1);

    for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
      for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
        let letter = message[index % message.length];
        fill(255);
        stroke(255)

        let distance = dist(mouseX, mouseY, x, y);
        let size = gridSpacing/width;
        // let size = 2 


        let imgX = floor(map(x, (width - imgWidth) / 2, (width + imgWidth) / 2, 0, logoImg.width));
        let imgY = floor(map(y, (height - imgHeight) / 2, (height + imgHeight) / 2, 0, logoImg.height));

        let pixelIndex = (imgY * logoImg.width + imgX) * 4;
        let r = logoImg.pixels[pixelIndex];
        let g = logoImg.pixels[pixelIndex + 1];
        let b = logoImg.pixels[pixelIndex + 2];



          if (distance < mouseRadius) {
            if (r < 128 && g < 128 && b < 128) {
              size += map(distance, 0, mouseRadius, 5, 2);
            } else {
              size = 1 
            }
          } else {
            // size += 3;
            size += 2 
          }

        textSize(size * 4);
        text(letter, x, y - (textAscent() + textDescent()) / 4);
        index++;
    }
  }
}

function mousePressed() { 
  targetRadius = 650;
}

function mouseReleased() { 
  targetRadius = 200;
}