let message = "InteractionDesign";
let bigWord = "ZHdK"
let mouseRadius = 250;
let targetRadius = 250;
let bigWordPixels = [];
let logoImg;
let imgAspectRatio;
let imgWidth, imgHeight;
let gridSpacing

let mousePressedFlag = false;

function preload() {
  font = loadFont('assets/Neue-HaasGroteskDispW0496BlkIt.otf');
}

function setup() {
  //lower framerate for less lag
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  textFont(font);

  let textSizeFinal = windowWidth>1000? 500: windowWidth/3;

  bigWordImg = createGraphics(windowWidth, windowHeight);
  bigWordImg.textFont(font);
  bigWordImg.pixelDensity(1)
  bigWordImg.textSize(textSizeFinal);
  bigWordImg.textAlign(CENTER, CENTER);
  bigWordImg.background(0);
  bigWordImg.fill(255);
  bigWordImg.text(bigWord, bigWordImg.width / 2, bigWordImg.height / 2);
  bigWordImg.loadPixels();
  pixelDensity(1)
}

function draw() {
  background(0);
  let index = 0;

  gridSpacing = min(windowWidth, windowHeight) / 40, 10;

  mouseRadius = lerp(mouseRadius, targetRadius, 0.1);

    for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
      for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
          let letter = message[index % message.length];
          fill(255);
          stroke(255)

          let distance = dist(mouseX, mouseY, x, y);
          let size = gridSpacing/width;

          let imgX = floor(map(x, 0, width, 0, bigWordImg.width));
          let imgY = floor(map(y, 0, height, 0, bigWordImg.height));
          let pixelIndex = (imgY * bigWordImg.width + imgX) * 4;

          let r = bigWordImg.pixels[pixelIndex];
          let g = bigWordImg.pixels[pixelIndex + 1];
          let b = bigWordImg.pixels[pixelIndex + 2];

          // let noiseScale = 0.005; 
          let noiseScale = 0.01; 
          let noiseOffset = frameCount * 0.01;

          let noiseValue = noise(x * noiseScale, y * noiseScale, noiseOffset);

          let waveX = map(noiseValue, 0, 1, -15, 15);
          let waveY = map(noiseValue, 0, 1, -15, 15);

          let finalX = x + waveX;
          let finalY = y + waveY;
    
          //inside radius
          if (distance < mouseRadius) {
              if (r < 128 && g < 128 && b < 128) {
                size += map(distance, 0, mouseRadius, 12, 0);

              } else {
                size -= 1
              }

            } else {
              size += noiseValue * 2
            }
        

          textSize(size * 4);
          text(letter, finalX,finalY -(textAscent() + textDescent())/4)

          index++;
      }
    }
}

function mousePressed() { 
  mousePressedFlag = true;
  targetRadius = 700;
}

function mouseReleased() { 
  mousePressedFlag = false;
  targetRadius = 250;
}