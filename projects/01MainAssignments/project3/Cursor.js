class Cursor {
    constructor(width, height, x,y) {
      this.angle = random(TWO_PI);
      this.factor = 0.8 + random(0.4);
      this.width = width;
      this.height = height;
      this.x = x + random(-100, 100);
      this.y = y + random(-100, 100);
    }
  
    move(newV) {
      this.rotate(newV);
      this.scale(newV);
  
      this.x += newV.x;
      this.y += newV.y;
  
      if (this.x < 0) this.x += this.width;
      if (this.y < 0) this.y += this.height;
      this.x = this.x % this.width;
      this.y = this.y % this.height;
    }
  
    rotate(newV) {
      const newX = newV.x * cos(this.angle) - newV.y * sin(this.angle);
      const newY = newV.x * sin(this.angle) + newV.y * cos(this.angle);
      newV.x = newX;
      newV.y = newY;
    }
  
    scale(newV) {
      newV.x *= this.factor;
      newV.y *= this.factor;
    }
  
    draw() {
      image(cursor, this.x-11, this.y-11,cursor.width+7, cursor.height+7);
      noStroke();
    }
  }
  
  class FollowCursor extends Cursor {
    move(cursor) {
      this.x = cursor.x;
      this.y = cursor.y;
    }
  }