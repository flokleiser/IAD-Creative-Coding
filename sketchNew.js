let message = "InteractionDesign";
let bigWord = "ZHdK"
let mouseRadius = 200;
let targetRadius = 200;
let bigWordPixels = [];
let logoImg;
let imgAspectRatio;
let imgWidth, imgHeight;
let gridSpacing

function preload() {
  font = loadFont('/98_media/fonts/Neue-HaasGroteskDispW0496BlkIt.otf');
}

function setup() {
  createCanvas(800,800)
  background(0);
  textAlign(CENTER, CENTER);
  textFont(font);

  bigWordImg = createGraphics(1200,800);
  bigWordImg.textFont(font);
  bigWordImg.textSize(500);
  bigWordImg.textAlign(CENTER, CENTER);
  bigWordImg.background(0);
  bigWordImg.fill(255);
  bigWordImg.text(bigWord, bigWordImg.width / 2, bigWordImg.height / 2);
  bigWordImg.loadPixels();


}

function draw() {
  background(0);
  let index = 0;

  let gridSpacing = 20

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