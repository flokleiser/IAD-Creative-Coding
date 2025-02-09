let attractors = [];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    // colorMode(HSB);
    attractors.push(new LorenzConstructor(0.01, 0, 0, 10, 28, 8/3, 0.01, color('#590d22')));
    attractors.push(new LorenzConstructor(0.01, 0, 0, 14, 28, 8/3, 0.01, color('#a4133c')));
    attractors.push(new LorenzConstructor(0.01, 0, 0, 10, 32, 8/3, 0.01, color('#ff4d6d')));
}

function draw() {
    orbitControl();
    background(0);
    
    for (let attractor of attractors) {
        attractor.update();
        attractor.draw();
    }
}

class LorenzConstructor {
    constructor(x, y, z, a, b, c, dt, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        this.b = b;
        this.c = c;
        this.dt = dt;
        this.color = color;
        this.points = [];
        this.maxPoints = 300; 
    }
    
    update() {
        let dx = this.a * (this.y - this.x) * this.dt;
        let dy = (this.x * (this.b - this.z) - this.y) * this.dt;
        let dz = (this.x * this.y - this.c * this.z) * this.dt;
        
        this.x = this.x + dx;
        this.y = this.y + dy;
        this.z = this.z + dz;
        
        this.points.push(new p5.Vector(this.x, this.y, this.z));
        
        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }
    }
    
    draw() {
        push();
        translate(0, 0, -80);
        scale(10);
        noFill();
        
        stroke(this.color);
        strokeWeight(3);
        // stroke(255)
        for (let v of this.points) {
            point(v.x, v.y, v.z);
        }
        stroke(this.color);

        beginShape();
        for (let v of this.points) {
            vertex(v.x, v.y, v.z);
        }
        endShape();
        pop(); 
    }
}