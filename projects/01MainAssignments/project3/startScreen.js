function preload() {

    // captcha = loadImage('assets/recaptcha.svg')
    captcha = loadImage('assets/recaptcha2.svg')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255)

    rectMode(CENTER)
    translate(width / 2, height / 2);
    rect(0, 0, 350, 100,5,5,5,5)


    textAlign(CENTER, CENTER)
    textSize(23)
    text("I'm not a robot", -20,0)

    rect(-125, 0, 40, 40,2,2,2,2)  
    image(captcha, +100, -20, 52, 50)

}



//test



