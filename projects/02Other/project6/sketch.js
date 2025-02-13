//ASCII
//noise test for now

let noiseValue
let noiseBuffer

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    let noiseLevel = 255 
    let noiseScale = 0.1

    // for (let y = 0; y < height; y += 1) {
    for (let y = 0; y < height; y += 35) {
        // for (let x = 0; x < width; x += 1) {
        for (let x = 0; x < width; x += 35) {
          let nx = noiseScale * x;
          let ny = noiseScale * y;
    
          // Compute the noise value.
          let c = noiseLevel * noise(nx, ny);
    
          // Draw the point.
          fill(c);
          square(x, y, 35);

        //   point(x,y)
        }
      }

    // noiseValue = noise(0.1)
    // noiseBuffer = createGraphics(windowWidth, windowHeight)

}

function draw() {
    // background(0)
    // fill(50)
}