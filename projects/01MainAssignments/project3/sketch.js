let cursors = [];
let followCursor;
let button1Flag = false;
let button2Flag = false
let button1
let button2


function preload() {
  cursor = loadImage('assets/default.svg');
}

class Cursor {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.x = random(width);
    this.y = random(height);
    this.angle = random(TWO_PI);
    this.factor = 0.8 + random(0.4);
  }

  move(v) {
    this.rotate(v);
    this.scale(v);

    this.x += v.x;
    this.y += v.y;

    if (this.x < 0) this.x += this.width;
    if (this.y < 0) this.y += this.height;
    this.x = this.x % this.width;
    this.y = this.y % this.height;
  }

  rotate(v) {
    const newX = v.x * cos(this.angle) - v.y * sin(this.angle);
    const newY = v.x * sin(this.angle) + v.y * cos(this.angle);
    v.x = newX;
    v.y = newY;
  }

  scale(v) {
    v.x *= this.factor;
    v.y *= this.factor;
  }

  draw() {

    image(cursor, this.x-11, this.y-11,cursor.width, cursor.height);
    noStroke();
  }
}

class FollowCursor extends Cursor {
  move(e) {
    this.x = e.x;
    this.y = e.y;
  }
}

function drawButton(button, buttonText, buttonFlag) {
  rectMode(CENTER);
  if (buttonFlag) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  rect(button.x, button.y, button.width, button.height, 10, 10, 10, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(buttonText, button.x, button.y);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // const numCursors = 35;
  const numCursors = 2

  button1 = { x: width / 2 - 150, y: height / 2, width: 200, height: 100 };
  button2 = { x: width / 2 + 150, y: height / 2, width: 200, height: 100 };

  for (let i = 0; i < numCursors; i++) {
    cursors.push(new Cursor(width, height));
  }

  followCursor = new FollowCursor(width, height);

  noCursor(); 
}

function draw() {
  background(255);

  drawButton(button1, "Button 1", button1Flag);
  drawButton(button2, "Button 2", button2Flag);

  cursors.forEach((cursor) => {
    cursor.draw();
  });
  followCursor.draw();
}

function mouseMoved() {
  const movement = { x: movedX, y: movedY };
  cursors.forEach((cursor) => {
    cursor.move(movement);
  });

  if (followCursor) {
    followCursor.move({ x: mouseX, y: mouseY });
  }
}

function isInsideButton(x, y, button) {
  return x > button.x - button.width / 2 &&
         x < button.x + button.width / 2 &&
         y > button.y - button.height / 2 &&
         y < button.y + button.height / 2;
}

function isCursorOverButton(button) {
  for (let cursor of cursors) {
    if (isInsideButton(cursor.x, cursor.y, button)) {

      return true;
    }
  }
  return false;
}

function mousePressed() {
  if (isInsideButton(mouseX, mouseY, button1) || isCursorOverButton(button1)) {
    console.log("Button 1 pressed", button1Flag);
    button1Flag = !button1Flag;
  } else if (isInsideButton(mouseX, mouseY, button2)|| isCursorOverButton(button2)) {
    button2Flag = !button2Flag;
    console.log("Button 2 pressed", button2Flag);
  }
}

