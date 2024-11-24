let cursors = [];
let followCursor;


function preload() {
  // cursor = loadImage('assets/cursor.png');
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

function setup() {
  createCanvas(windowWidth, windowHeight);
  const numCursors = 5;

  for (let i = 0; i < numCursors; i++) {
    cursors.push(new Cursor(width, height));
  }

  followCursor = new FollowCursor(width, height);

  noCursor(); 
}

function draw() {
  background(255);

  rectMode(CENTER)
  fill(100,100,100)
  rect(width/2, height/2, 200, 100, 10,10,10,10) 

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

  followCursor.move({ x: mouseX, y: mouseY });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
