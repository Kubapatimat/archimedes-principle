export class Box {
  constructor(x, y, width, height, density) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.width = width;
    this.height = height;
    this.density = density;
    this.volume = this.width * this.width * this.height;
    this.calculateMass();
  }

  get top() {
    return this.position.y - this.height / 2;
  }

  get bottom() {
    return this.position.y + this.height / 2;
  }

  get left() {
    return this.position.x - this.width / 2;
  }

  get right() {
    return this.position.x + this.width / 2;
  }

  calculateMass() {
    this.mass = this.volume * this.density;
  }

  applyForce(force) {
    this.acceleration.add(p5.Vector.div(force, this.mass));
  }

  update(deltaTime) {
    this.velocity.add(p5.Vector.mult(this.acceleration, deltaTime));
    this.position.add(p5.Vector.mult(this.velocity, deltaTime));
    this.acceleration.mult(0);
  }

  collideWithWall(liquid) {
    if (this.bottom >= liquid.bottom) {
      this.position.y = liquid.bottom - this.height / 2;
      this.velocity.y = 0;
      this.acceleration.y = 0;
    }
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255);
    rectMode(RADIUS);
    rect(this.position.x, this.position.y, this.width / 2, this.height / 2);
  }
}
