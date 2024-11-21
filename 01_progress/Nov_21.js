let message = "InteractionDesign";
let mouseRadius = 250;
let targetRadius = 250;

function preload() {
  font = loadFont('/98_media/Neue-HaasGroteskDispW0496BlkIt.otf');
  // font = loadFont('/98_media/Arial-Rounded-Bold.ttf');
  // font = loadFont('/98_media/BIRMINGHAM-BF65854947a57dc.otf')
  // font = loadFont('/98_media/Neue-Haas-Grotesk-DispW0495Blk.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  textFont(font);
}

function draw() {
  background(0);
  let index = 0;
  let gridSpacing = 40;

  mouseRadius = lerp(mouseRadius, targetRadius, 0.1);
  // let mouseRadius = 250;


  for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
    for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
      let letter = message[index % message.length];
      fill(255);

      // let size = gridSpacing/width;
			// size += abs(sin((frameCount*0.05)+(x+y)/2*0.6) * 6);

      let distance = dist(mouseX, mouseY, x, y);
      let size = gridSpacing/width
      if(distance < mouseRadius) {
        size += map(distance, 0, mouseRadius, 6, 1);
      }else{
        size += 1
      }

      textSize(size*5);
      text(letter, x, y);
      index++;
    }
  }
}


function mousePressed() { 
  // mouseRadius = 350;
  targetRadius = 350;
}

function mouseReleased() { 
  // mouseRadius = 250;
  targetRadius = 250;
}