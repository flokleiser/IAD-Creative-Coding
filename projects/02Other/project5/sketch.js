let cols, rows
let scale = 20;
let spacing = 40
let gridCoords = []
let mouseRadius = 100
let targetRadius = 100  
let fr

let squareSize = 30
let squareColor = 50

let noiseValue
let noiseBuffer

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    cols = windowWidth / scale;
    rows = windowHeight / scale;

    for (let i = 0; i < width + 20; i += spacing ) {
        for (let j = 0; j < height + 20; j += spacing) {
            gridCoords.push([i,j])
        }
    }
    noiseValue = noise(0.1)

    noiseBuffer = createGraphics(windowWidth, windowHeight)

}

function draw() {
    background(0)
    fill(50)

    let xValue = mouseX
    let yValue = mouseY

    mouseRadius = lerp(mouseRadius, targetRadius, 0.1)
    rectMode(CENTER)

    for (let i = 0; i < gridCoords.length; i++) {
        let distance = dist(xValue,yValue,gridCoords[i][0],gridCoords[i][1])
        if (distance < mouseRadius) {
            fill(255)
            square(gridCoords[i][0],gridCoords[i][1],squareSize)
        }
        else {
            fill(50)
            square(gridCoords[i][0],gridCoords[i][1],squareSize)
        }
    }

    infoDisplay();

}


function infoDisplay() {
    if (frameCount % 10 == 0) {
      fr = frameRate();
    }
    textSize(24);
    fill("white");
    textAlign(RIGHT, BOTTOM);
    text(str(int(fr))+" fps", width, height);
}

function mousePressed() { 
    targetRadius = 200;
  }
  
  function mouseReleased() { 
    targetRadius = 100;
  }
