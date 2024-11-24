let cursors = [];
let followCursor;
let buttons = []
let buttonFlags = []

let extraButtons = []
let extraButtonFlags = []

let reloadButton;

let winningPercentage = 0.8;

let buttonWidth = 125;
let buttonHeight = 125;
let gridRows = 4;
let gridCols = 4;
let padding = 7 

let gridHeight

let bigDiv = {};
let topRect = {}; 
let bottomRect = {}; 


function preload() {
  cursor = loadImage('assets/default.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const numCursors = 0
  let gridWidth = gridCols * (buttonWidth + padding) - padding;
  gridHeight = gridRows * (buttonHeight + padding) - padding;

  let bigDivWidth = gridWidth + padding * 2;
  let bigDivHeight = gridHeight + 300; 



  let scaleFactor = 1;
  if (bigDivHeight > height || bigDivWidth > width) {
    scaleFactor = min(
      (height) / bigDivHeight,
      (width - 100) / bigDivWidth
    );
  }

  bigDiv = {
    x: (width - bigDivWidth) / 2,
    y: (height - bigDivHeight) / 2,
    width: bigDivWidth,
    height: bigDivHeight,
  };
  topRect = {
    x: bigDiv.x + padding,
    y: bigDiv.y + padding,
    width: bigDiv.width- 2*padding,
    height: (bigDiv.height-2*padding - gridHeight)/ 1.5,
  };
  bottomRect = {
    x: bigDiv.x+padding,
    y: bigDiv.y + topRect.height + gridHeight +3*padding,
    width: bigDiv.width-2*padding,
    height: (bigDiv.height -topRect.height- gridHeight + 2*padding) / 1.5
  };
  console.log(bigDiv.height - gridHeight)

  bigDivWidth = gridWidth + padding * 2;
  bigDivHeight = gridHeight + 300 * scaleFactor*2;

  buttonWidth *= scaleFactor;
  buttonHeight *= scaleFactor;
  padding *= scaleFactor;


  let buttonStartX = bigDiv.x + (bigDiv.width - gridWidth) / 2 + buttonWidth / 2;
  let buttonStartY = topRect.y + topRect.height + buttonHeight / 2 + padding;
  // buttons = []; // Clear buttons array to reset positions
  // buttonFlags = []; // Clear flags
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      let x = buttonStartX + col * (buttonWidth + padding);
      let y = buttonStartY + row * (buttonHeight + padding);
      buttons.push({ x: x, y: y, width: buttonWidth, height: buttonHeight });
      buttonFlags.push(false);
    }
  }

  extraButtons.push({ x: width / 2, y: 100, width: 200, height: 100 });
  extraButtonFlags.push(false);

  reloadButton = { x: width / 2, y: height/2, width: 400, height: 200 };

  for (let i = 0; i < numCursors; i++) {
    cursors.push(new Cursor(width, height));
  }

  followCursor = new FollowCursor(width, height);

  noCursor(); 
}

function draw() {
  background(255);

  drawUI()

  for (let i = 0; i < buttons.length; i++) {
    drawButtonGrid(buttons[i],' ', buttonFlags[i]);
  }

  let coloredCount = countColoredButtons();
  let percentage = (coloredCount / buttons.length) * 100;
  fill(0);
  textSize(20);
  text(`Progress: ${round(percentage)}%`, width-75 , 25);

  if (coloredCount >= buttons.length * winningPercentage) {
    drawButton(reloadButton, "Continue", false);
  }

  cursors.forEach((cursor) => {
    cursor.draw();
  });
  followCursor.draw();
}

function drawUI() {
  rectMode(CORNER)
  noFill();
  strokeWeight(2)
  stroke(0);
  rect(bigDiv.x, bigDiv.y, bigDiv.width, bigDiv.height);

  // fill(240);
  fill(80,170,255)	
  noStroke();
  rect(topRect.x, topRect.y, topRect.width, topRect.height);

  fill(255);
  // fill(80,170,255)	
  rect(bottomRect.x, bottomRect.y, bottomRect.width, bottomRect.height);

  // textAlign(CENTER, CENTER);  
  textAlign(LEFT, CENTER);
  textStyle(BOLD)
  textSize(25);
  fill(255);
  text(`Fill at least`, (topRect.x + 7*padding), topRect.y + topRect.height/3 - 2*padding);
  textSize(50);
  text(`${winningPercentage * 100}%`,(topRect.x + 7*padding),topRect.y+topRect.height/2);
  textSize(25);
  text(`of the buttons to continue`, topRect.x + 7*padding,topRect.y+ topRect.height/1.5 + 2*padding);

}

function drawButton(button, buttonText, buttonFlag) {
  rectMode(CENTER);
  fill(mouseIsPressed? "#333333": "#000000");
  rect(button.x, button.y, button.width, button.height, 10, 10, 10, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  text(buttonText, button.x, button.y);
}

function drawButtonGrid(button, buttonText, buttonFlag) {
  rectMode(CENTER);
  // stroke(0)
  fill(buttonFlag ? color(0,250,0) : color(200,200,200));

  rect(button.x, button.y, button.width, button.height, 2, 2, 2, 2);
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
  let coloredCount = countColoredButtons();

  if (coloredCount >= buttons.length * winningPercentage) {
    if (isInsideButton(mouseX, mouseY, reloadButton)) {
      window.location.reload();
    }
    return;
  }

  if (cursors.length < 25) {
  cursors.push(new Cursor(width, height));
  } else {
    console.log('max')
  }

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
      extraButtonFlags[i] = true
    }
  }
}

