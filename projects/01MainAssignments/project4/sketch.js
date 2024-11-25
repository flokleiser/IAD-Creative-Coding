let activeNumber = null;
let isDragging = false;
let rotation = 0;
let initialRotation = 0;
let dragStartAngle = 0;
let velocity = 0;
let filledCircleCount = 0;
let isUnfilling = false;

const friction = 0.9;
const resetSpeed = 10;

let dialedNumbers = [];
let currentDial = null;
const numbers = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1, "  "," "];


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  mask = createGraphics(400, 400);
  mask.angleMode(DEGREES);

}

function draw() {
  background(240);
  translate(width / 2, height / 2);

  // drawIndicatorCircles();
  drawLockBackground();

  push();
  rotate(rotation);
  drawLock()  
  pop();

  if (!isDragging) {
    if (rotation !== 0) {
      let delta = resetSpeed * (rotation > 0 ? -1 : 1);
      rotation += delta;
      if (abs(rotation) < resetSpeed) rotation = 0;

      if (currentDial !== null) {
      dialedNumbers.push(currentDial); 
      currentDial = null; 
      }
    }
  }
  drawDialedNumbers();
}

function drawLockBackground() {
  fill(200);
  ellipse(0, 0, 400, 400);

  textSize(20);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < numbers.length; i++) {
    const angle = map(i, 0, numbers.length, 0, 360);
    const x = cos(angle) * 150;
    const y = sin(angle) * 150;
    fill(activeNumber === i ? 0 : 150);
  

    if (numbers[i] === " ") {
      noFill();
      stroke(0);
      circle(x, y, 40);
    } else {
      noStroke();
      text(numbers[i], x, y);
    }
    
  }
}

function drawLock() {
  fill(200, 200, 200,50);  
  ellipse(0, 0, 400, 400);

  fill(0)
  ellipse(0, 0, 200, 200);

  textSize(20);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 10; i++) {
    const angle = map(i, 0, 12, 0, 360);
    const x = cos(angle) * 150;
    const y = sin(angle) * 150;
    noFill();
    stroke(255, 255, 255, 255);
    strokeWeight(2);
    circle(x, y, 75);

    if (activeNumber === i) {
      fill(255, 0, 0, 100);
      ellipse(x, y, 75, 75);
    }
  }
}


function getDialedNumber(angle) {
  const adjustedAngle = (angle + 360) % 360;
  const sectorSize = 360 / 12;
  const index = floor((adjustedAngle + sectorSize / 2) / sectorSize) % 12;
  console.log(index)
  return index;
}

function drawDialedNumbers() {
  fill(0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(dialedNumbers.join(""), 0, -250);
}

function mousePressed() {
  const angle = calculateAngle(mouseX, mouseY);
  dragStartAngle = angle;
  initialRotation = rotation;

  if (mouseInLockArea()) {
    isDragging = true;
    activeNumber = getDialedNumber(angle);
  }
}

function mouseDragged() {
  if (isDragging) {
    const currentAngle = calculateAngle(mouseX, mouseY);
    const angleDiff = currentAngle - dragStartAngle;
    rotation = initialRotation + angleDiff;

    // if (rotation < -45) rotation = -45;
    if (rotation < -300) rotation = -300;
  }
}

function mouseReleased() {
  if (isDragging && activeNumber !== null) {
    if (rotation <= -250) {
      currentDial = numbers[activeNumber];
    }
  }
  isDragging = false;
  activeNumber = null
}

function calculateAngle(x, y) {
  const centerX = width / 2;
  const centerY = height / 2;
  return (atan2(y - centerY, x - centerX) + 360) % 360;
}

function mouseInLockArea() {
  const distToCenter = dist(mouseX, mouseY, width / 2, height / 2);
  return distToCenter < 200; // Adjust lock size
}

// function drawIndicatorCircles() {
//   const radius = 15;
//   for (let i = 0; i < 4; i++) {
//     fill(i < filledCircleCount ? 'black' : 'white');
//     ellipse(-90 + i * 30, -200, radius, radius);
//   }
// }

// function mouseOverLock() {
//   if (isDragging && !isUnfilling) {
//     filledCircleCount++;
//     if (filledCircleCount >= 4) {
//       isUnfilling = true;
//       setTimeout(emptyCircles, 500);
//     }
//   }
// }

// function emptyCircles() {
//   if (filledCircleCount > 0) {
//     filledCircleCount--;
//     setTimeout(emptyCircles, 100);
//   } else {
//     isUnfilling = false;
//   }
// }



//optional 4th project