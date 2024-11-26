let activeNumber = null;
let isDragging = false;
let rotation = 0;
let initialRotation = 0;
let dragStartAngle = 0;
let velocity = 0;
let filledCircleCount = 0;
let isUnfilling = false;

const friction = 0.9;

let dialedNumbers = [];
let currentDial = null;
const numbers = [" ", 0, 9, 8, 7, 6, 5, 4, 3, 2, 1,"  "];
const snapAngles = [360, 335, 305, 275, 245, 215, 185, 155, 125, 95, 75, 0]; 

const snapAngle = 50
const resetSpeed = 10

const tolerance = 20; 

function preload() {
  font = loadFont('assets/Maax Mono - Regular-205TF.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  textFont(font);

}

function draw() {
  background(50)
  translate(width / 2, height / 2);


  instructionText();
  drawDialedNumbers();
  push();
  rotate(rotation);
  drawLock()  
  pop();
  drawLockBackground();


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
}

function drawLockBackground() {
  noFill()
  ellipse(0, 0, 400, 400);

  for (let i = 0; i < numbers.length; i++) {
    const baseAngle = i * 30;
    const snapStopAngle = baseAngle + snapAngles[i]; 

    if (activeNumber === i) {
      fill(255, 0, 0, 150); 
    } else {
      fill(0, 0, 255, 50);
    }
  }

  textSize(25);
  textStyle(BOLD); 

  for (let i = 0; i < numbers.length; i++) {
    const angle = map(i, 0, numbers.length, 0, 360);
    const x = cos(angle) * 175;
    const y = sin(angle) * 175;
    fill(255)
  

    if (numbers[i] === " ") {
      fill(100)
      stroke(255);
      circle(x, y, 40);
    } else {
      noStroke();
      text(numbers[i], x, y);
    }
    
  }
}

function drawLock() {
  fill(255)
  ellipse(0, 0, 450, 450);

  fill(50)
  ellipse(0, 0, 250, 250);

  textSize(20);
  textAlign(CENTER, CENTER);

  for (let i = 1; i < 11; i++) {
    const angle = map(i, 0, 12, 0, 360);
    const x = cos(angle) * 175;
    const y = sin(angle) * 175;
    fill(50)
    stroke(50)
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
  return index;
}

function instructionText() {
  fill(255)
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Please input your phone number:", 0, -350); 
}

function formatPhoneNumber(numbers) {
  // const digits = numbers.join("");
  // return digits
  //   .replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4")
  //   .trim();
  const digits = numbers.join("");
  let formatted = "";

  for (let i = 0; i < digits.length; i++) {
    formatted += digits[i];
    if (i === 2 || i === 5 || i === 7) {
      formatted += " ";
    }

    if (digits.length === 10 && i === 9) {
      dialedNumbers = []
      console.log('reset')
    }
  }

  return formatted.trim(); 
}

function drawDialedNumbers() {
  fill(255)
  textSize(30);
  textAlign(CENTER, CENTER);

  const formattedNumber = formatPhoneNumber(dialedNumbers);
  text(formattedNumber, 0, -290);
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
  if (isDragging && activeNumber !== null) {
    const currentAngle = calculateAngle(mouseX, mouseY);
    const angleDiff = currentAngle - dragStartAngle;


    if (angleDiff > 0) {
      rotation = initialRotation + angleDiff;
    }

    const dynamicSnapAngle = snapAngles[activeNumber];

    if (rotation >= dynamicSnapAngle - tolerance) {
      currentDial = numbers[activeNumber];

      isDragging = false;
    }
  }
}

function mouseReleased() {
  if (isDragging && activeNumber !== null) {
    const stopAngle = activeNumber * 30 + snapAngles[activeNumber]; 
    if (rotation >= stopAngle - tolerance && rotation <= stopAngle + tolerance) {
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
  return distToCenter < 200;
}