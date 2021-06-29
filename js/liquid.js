export class Liquid {
  constructor(x, y, width, height, density) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.density = density;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  contains(box) {
    return (
      box.left < this.right &&
      box.right > this.left &&
      box.top < this.bottom &&
      box.bottom > this.top
    );
  }

  calculateSubmergedHeight(box) {
    return Math.min(box.bottom - this.y, box.height);
  }

  display() {
    noStroke();
    fill(150, 150, 255);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
  }
}
