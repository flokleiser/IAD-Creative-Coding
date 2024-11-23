let message = "InteractionDesign";
let bigWord = "ZHdK"
let mouseRadius = 250;
let targetRadius = 250;
let bigWordPixels = [];
let logoImg;
let imgAspectRatio;
let imgWidth, imgHeight;

function preload() {
    logoImg = loadImage('/98_media/iad_logo.png');
//   logoImg = loadImage('/98_media/iad_logo_small.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

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
    imageMode(CENTER);
    tint(255,51)

    noTint()

    let gridSpacing = 20;

    mouseRadius = lerp(mouseRadius, targetRadius, 0.1);

    for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
        for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
            let size = 1 
     



            let imgX = floor(map(x, (width - imgWidth) / 2, (width + imgWidth) / 2, 0, logoImg.width));
            let imgY = floor(map(y, (height - imgHeight) / 2, (height + imgHeight) / 2, 0, logoImg.height));

            let pixelIndex = (imgY * logoImg.width + imgX) * 4;
            let r = logoImg.pixels[pixelIndex];
            let g = logoImg.pixels[pixelIndex + 1];
            let b = logoImg.pixels[pixelIndex + 2];


                if (r < 128 && g < 128 && b < 128) {
                    size += 3
                }

        }
    }
}