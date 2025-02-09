// ASCII
let scale = 20;
let spacing = 30
let gridCoords = []
let mouseRadius = 100
let targetRadius = 100  
let fr

let squareColor = 50

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    cols = windowWidth / scale;
    rows = windowHeight / scale;
}

function draw() {
    // colorChange();
    background(0)
    fill(50)
    noStroke()

    mouseRadius = lerp(mouseRadius, targetRadius, 0.1)

    for (let i = 0; i < width; i += spacing ) {
        for (let j = 0; j < height; j += spacing) {
            gridCoords.push([i,j])

            let distance = dist(mouseX,mouseY,i,j)
            if (distance < mouseRadius) {
                fill(255)
                square(i,j,spacing/1.5)
            }

            else {
                fill(50)
                square(i,j,spacing/1.5)
            }

            // for (x = 0; x < gridCoords.length; x++) {
            //         fill(random(255),random(255),random(255))
            //         square(i,j,spacing/1.5)
            //     }
            square(gridCoords[i][0],gridCoords[i][1],spacing/1.5)

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
