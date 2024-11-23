let message = "InteractionDesign";
let bigWord = "ZHdK"
let mouseRadius = 250;
let targetRadius = 250;
let bigWordPixels = [];
let logoImg;
let imgAspectRatio;
let imgWidth, imgHeight;


function preload() {
  font = loadFont('/98_media/Neue-HaasGroteskDispW0496BlkIt.otf');
  logoImg = loadImage('/98_media/iad_logo.png');
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


  // buffer = createGraphics(windowWidth/15, windowHeight/15);
  // buffer.fill(255);
	// buffer.background(0,255,0);
	// buffer.textFont(font);
	// buffer.textAlign(CENTER, CENTER);
  // buffer.textSize(30);
	// buffer.text("ZHdK", buffer.width/2, buffer.height/2.5);

	// buffer.filter(BLUR, 1.2);

	// for (let x = 0; x < buffer.width; x++) {
	// 	bigWordPixels[x] = [];
	// 	for (let y = 0; y < buffer.height; y++) {
	// 		let pixelColor = buffer.get(x, y); 
	// 		let r = red(pixelColor);
	// 		bigWordPixels[x][y] = r/5;
	// 	}
	// }

}

function draw() {
  background(0);
  let index = 0;
  let gridSpacing = 25;

  mouseRadius = lerp(mouseRadius, targetRadius, 0.1);

  for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
    for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
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



      if (r < 128 && g < 128 && b < 128) {
        if (distance < mouseRadius) {
          size += map(distance, 0, mouseRadius, 8, 1);
        } else {
          size += 3;
        }
      }

      textSize(size * 5);
      text(letter, x, y - (textAscent() + textDescent()) / 4);
      index++;
  }
}




    // noFill()
    // stroke(255)
    // let stepX = windowWidth/buffer.width;
    // let stepY = windowHeight/buffer.height;
    // for (let y = 0; y < buffer.height; y++) {
    //   beginShape();
    //   for (let x = 0; x < buffer.width; x++) {
    //     let h = bigWordPixels[x][y]*(mouseX/width);
    //     let noiseScale = (mouseY/height);
    //     let noiseMouse = noise(x/noiseScale, y/noiseScale, frameCount/noiseScale)*(mouseY/height)*10; 
    //     h += noiseMouse;
    //     curveVertex(x*stepX, (y*stepY)-h);
    //   }
    //   endShape();
    // }
    // image(buffer,0,0);

}

// function mousePressed() { 
//   targetRadius = 450;
// }

// function mouseReleased() { 
//   targetRadius = 250;
// }