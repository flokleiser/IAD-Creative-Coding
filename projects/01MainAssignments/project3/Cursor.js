class Cursor {
    // constructor(width, height) {
    constructor(width, height, x,y) {
      this.width = width;
      this.height = height;
  
      // this.x = random(width);
      // this.y = random(height);
      // this.x = x + random(-200, 200);
      // this.y = y + random(-200, 200);
      this.x = x + random(-100, 100);
      this.y = y + random(-100, 100);
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
  
      image(cursor, this.x-11, this.y-11,cursor.width+10, cursor.height+10);
      noStroke();
    }
  }
  
  class FollowCursor extends Cursor {
    move(e) {
      this.x = e.x;
      this.y = e.y;
    }
  }