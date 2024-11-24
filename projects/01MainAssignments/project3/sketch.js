let cursors = [];
let followCursor;
let buttons = []
let buttonFlags = []


function preload() {
  cursor = loadImage('assets/default.svg');
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
  const numCursors = 0

  let buttonWidth = 200;
  let buttonHeight = 200;
  let gridRows = 4;
  let gridCols = 5;
  let padding = 20
  let gridWidth = gridCols * (buttonWidth + padding) - padding;
  let gridHeight = gridRows * (buttonHeight + padding) - padding;
  let startX = (width - gridWidth) / 2 + buttonWidth / 2;
  let startY = (height - gridHeight) / 2 + buttonHeight / 2;

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let x = startX + col * (buttonWidth + padding);
      let y = startY + row * (buttonHeight + padding);
      buttons.push({ x: x, y: y, width: buttonWidth, height: buttonHeight });
      buttonFlags.push(false);
    }
  }

  for (let i = 0; i < numCursors; i++) {
    cursors.push(new Cursor(width, height));
  }

  followCursor = new FollowCursor(width, height);

  noCursor(); 
}

function draw() {
  background(255);

  for (let i = 0; i < buttons.length; i++) {
    drawButton(buttons[i], `Button ${i + 1}`, buttonFlags[i]);
  }

  cursors.forEach((cursor) => {
    cursor.draw();
  });
  followCursor.draw();
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

function mouseMoved() {
  const movement = { x: movedX, y: movedY };
  cursors.forEach((cursor) => {
    cursor.move(movement);
  });

  if (followCursor) {
    followCursor.move({ x: mouseX, y: mouseY });
  }
}

function mousePressed() {
  cursors.push(new Cursor(width, height));
  for (let i = 0; i < buttons.length; i++) {
    if (isInsideButton(mouseX, mouseY, buttons[i]) || isCursorOverButton(buttons[i])) {
      buttonFlags[i] = !buttonFlags[i];
    }
  }
}

