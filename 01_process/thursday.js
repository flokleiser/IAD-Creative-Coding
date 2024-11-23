let message = "InteractionDesign";
let bigWord = "ZHdK";
let mouseRadius = 200;
let targetRadius = 200;
let points = [];
let font;
let gridSpacing;

function preload() {
  font = loadFont('/98_media/fonts/Neue-HaasGroteskDispW0496BlkIt.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  textFont(font);

  // Generate points from the bigWord text
//   points = font.textToPoints(bigWord, windowWidth / 2 - 500, windowHeight / 2, 500, {
//     sampleFactor: 0.1
//   });
points = font.textToPoints(bigWord, 0, 0, 500, {
    sampleFactor: 0.1
  });
}

function draw() {
  background(0);
  let index = 0;

  if (windowHeight < windowWidth) {
    gridSpacing = windowHeight / 40;
  } else {
    gridSpacing = windowWidth / 40;
  }

  mouseRadius = lerp(mouseRadius, targetRadius, 0.1);

  for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
    for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
      let letter = message[index % message.length];
      fill(255);
      stroke(255);

      let distance = dist(mouseX, mouseY, x, y);
      let size = gridSpacing / width;

      let closestDist = Infinity;
      for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        let d = dist(x, y, pt.x, pt.y);
        if (d < closestDist) {
          closestDist = d;
        }
      }

      if (distance < mouseRadius) {
        if (closestDist < 50) {
          size += map(distance, 0, mouseRadius, 10, 2);
        } else {
          size += 1;
        }
      } else {
        size += 4;
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