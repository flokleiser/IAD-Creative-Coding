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

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(240);
  translate(width / 2, height / 2);

  drawIndicatorCircles();

  push();
  rotate(rotation);
  drawLock();
  pop();

  if (!isDragging) {
    if (rotation !== 0) {
      let delta = resetSpeed * (rotation > 0 ? -1 : 1);
      rotation += delta;
      if (abs(rotation) < resetSpeed) rotation = 0;
    }
  }
}

function mousePressed() {
  const angle = calculateAngle(mouseX, mouseY);
  dragStartAngle = angle;
  initialRotation = rotation;

  if (mouseInLockArea()) {
    isDragging = true;
  }
}

function mouseDragged() {
  if (isDragging) {
    const currentAngle = calculateAngle(mouseX, mouseY);
    const angleDiff = currentAngle - dragStartAngle;
    rotation = initialRotation + angleDiff;

    if (rotation < -45) rotation = -45;
  }
}

function mouseReleased() {
  isDragging = false;
}

function calculateAngle(x, y) {
  const centerX = width / 2;
  const centerY = height / 2;
  return (atan2(y - centerY, x - centerX) + 360) % 360;
}

function mouseInLockArea() {
  // Define lock area radius
  const distToCenter = dist(mouseX, mouseY, width / 2, height / 2);
  return distToCenter < 100; // Adjust lock size
}

function drawLock() {
  fill(200);
  ellipse(0, 0, 200, 200);

  fill(100);
  ellipse(0, 0, 50, 50);

  textSize(20);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 10; i++) {
    const angle = map(i, 0, 10, 0, 360);
    const x = cos(angle) * 80;
    const y = sin(angle) * 80;
    fill(activeNumber === i ? 0 : 150);
    text(i, x, y);
    // rotate(angle)
  }
}

function drawIndicatorCircles() {
  const radius = 15;
  for (let i = 0; i < 4; i++) {
    fill(i < filledCircleCount ? 'black' : 'white');
    ellipse(-90 + i * 30, -200, radius, radius);
  }
}

function mouseOverLock() {
  if (isDragging && !isUnfilling) {
    filledCircleCount++;
    if (filledCircleCount >= 4) {
      isUnfilling = true;
      setTimeout(emptyCircles, 500);
    }
  }
}

function emptyCircles() {
  if (filledCircleCount > 0) {
    filledCircleCount--;
    setTimeout(emptyCircles, 100);
  } else {
    isUnfilling = false;
  }
}
