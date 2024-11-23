let message = "InteractionDesign";
let bigWord = "ZHdK"
let mouseRadius = 250;
let targetRadius = 250;
let bigWordPixels = [];
let logoImg;
let imgAspectRatio;
let imgWidth, imgHeight;
let gridSpacing
let blurAmount = 0
let targetBlurAmount = 0;

let mousePressedFlag = false;

function preload() {
  font = loadFont('assets/Neue-HaasGroteskDispW0496BlkIt.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  textFont(font);

  let textSizeFinal = windowWidth>1000? 500: windowWidth/3;
  // console.log(textSizeFinal)

  bigWordImg = createGraphics(windowWidth, windowHeight);
  bigWordImg.textFont(font);
  bigWordImg.pixelDensity(1)
  // bigWordImg.textSize(windowWidth/3);
  bigWordImg.textSize(textSizeFinal);
  // bigWordImg.textSize(500);
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
  // if (windowHeight < windowWidth) {
  //   gridSpacing = windowHeight/40;
  // } else {
  //   gridSpacing = windowWidth/40;
  // }

  gridSpacing = min(windowWidth, windowHeight) / 40;

  mouseRadius = lerp(mouseRadius, targetRadius, 0.1);
  blurAmount = lerp(blurAmount, targetBlurAmount, 0.1);



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

            let waveAmplitude = 25
            let waveSpeed = frameCount * 0.05;
            let noiseScale = 0.005; 

            if (mousePressedFlag) {
              waveAmplitude = 10; 

            } else {
                waveAmplitude = 25; 
            }
      
            let waveX = sin((x * noiseScale) + waveSpeed) * waveAmplitude;
            let waveY = cos((y * noiseScale) + waveSpeed) * waveAmplitude;
      
            let finalX = x + waveX * 0.25; 
            let finalY = y + waveY * 0.5;       
      
            //inside radius
            if (distance < mouseRadius) {
                if (r < 128 && g < 128 && b < 128) {
                  size += map(distance, 0, mouseRadius, 12, 2)
                } else {
                  size -= 1
                }

              //outside radius
              } else {
                size += 5
              }
          

            textSize(size * 4);
            // text(letter, x, y - (textAscent() + textDescent()) / 4);
            text(letter, finalX, finalY- (textAscent() + textDescent()) / 4);
            index++;
        }
      }

      if (blurAmount > 0) {
        filter(BLUR, blurAmount);
      }

}

function mousePressed() { 
  mousePressedFlag = true;
  targetRadius = 700;
  targetBlurAmount = 3;
}

function mouseReleased() { 
  mousePressedFlag = false;
  targetRadius = 250;
  targetBlurAmount = 0;
}