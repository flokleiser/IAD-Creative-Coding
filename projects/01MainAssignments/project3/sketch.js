let cursors = [];
let followCursor;
let buttons = []
let buttonFlags = []

let extraButtons = []
let extraButtonFlags = []


function preload() {
  cursor = loadImage('assets/default.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const numCursors = 0

  let buttonWidth = 150;
  let buttonHeight = 150;
  let gridRows = 5;
  let gridCols = 4;
  let padding = 10
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

  extraButtons.push({ x: width / 2, y: 100, width: 200, height: 100 });
  extraButtonFlags.push(false);

  for (let i = 0; i < numCursors; i++) {
    cursors.push(new Cursor(width, height));
  }

  followCursor = new FollowCursor(width, height);

  noCursor(); 
}

function draw() {
  background(255);

  textAlign(CENTER, CENTER);  
  textSize(20);
  fill(0);
  text("Fill at least 90% of the buttons to continue", width / 2,50);

  for (let i = 0; i < buttons.length; i++) {
    drawButtonGrid(buttons[i],' ', buttonFlags[i]);
  }



  cursors.forEach((cursor) => {
    cursor.draw();
  });
  followCursor.draw();

  let coloredCount = countColoredButtons();
  fill(0);
  textSize(20);
  text(`Filled Buttons: ${coloredCount}/${buttons.length}`, width / 2, height - 50);

  // Display text when 90% of the buttons are colored
  if (coloredCount >= buttons.length * 0.9) {
    textSize(30);
    text("90% of the buttons are colored!", width / 2, height - 20);
  }



}


function drawButton(button, buttonText, buttonFlag) {
  rectMode(CENTER);
  fill(mouseIsPressed? "#333333": "#000000");
  rect(button.x, button.y, button.width, button.height, 10, 10, 10, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(buttonText, button.x, button.y);
}

function drawButtonGrid(button, buttonText, buttonFlag) {
  rectMode(CENTER);
  stroke(0)
  // fill(buttonFlag ? color(0,255,0) : color(255,0,0));
  fill(buttonFlag ? color(0,250,0) : color(200,200,200));

  rect(button.x, button.y, button.width, button.height, 10, 10, 10, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(buttonText, button.x, button.y);
}

function countColoredButtons() {
  let count = 0;
  for (let i = 0; i < buttonFlags.length; i++) {
    if (buttonFlags[i]) {
      count++;
    }
  }
  return count;
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
  for (let i = 0; i < extraButtons.length; i++) {
    if (isInsideButton(mouseX, mouseY, extraButtons[i]) || isCursorOverButton(extraButtons[i])) {
      extraButtonFlags[i] = !extraButtonFlags[i];
    }
  }


  for (let i = 0; i < buttons.length; i++) {
    if (isInsideButton(mouseX, mouseY, buttons[i]) || isCursorOverButton(buttons[i])) {
      buttonFlags[i] = !buttonFlags[i];
    }
}
}

function mouseIsPressed() {
  for (let i = 0; i < extraButtons.length; i++) {
    if (isInsideButton(mouseX, mouseY, extraButtons[i]) || isCursorOverButton(extraButtons[i])) {
      cursors.splice(0, 2);
    }
  }
}

