export class Arrow {
  constructor(x, y, length, color) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.arrowWidth = 8;
    this.arrowHeight = 25;
    this.lengthScalar = 10;
    this.color = color;
  }

  draw() {
    if (this.length == 0) return;

    stroke(this.color);
    const scaledLength = this.length * this.lengthScalar;

    line(this.x, this.y, this.x, this.y + scaledLength);

    if (this.length > 0) {
      line(
        this.x,
        this.y + scaledLength,
        this.x - this.arrowWidth,
        this.y + scaledLength - this.arrowHeight
      );
      line(
        this.x,
        this.y + scaledLength,
        this.x + this.arrowWidth,
        this.y + scaledLength - this.arrowHeight
      );
    } else {
      line(
        this.x,
        this.y + scaledLength,
        this.x - this.arrowWidth,
        this.y + scaledLength + this.arrowHeight
      );
      line(
        this.x,
        this.y + scaledLength,
        this.x + this.arrowWidth,
        this.y + scaledLength + this.arrowHeight
      );
    }

    fill(this.color);
    noStroke();
    textSize(32);
    text(
      -this.length.toFixed(4).toString(),
      this.x + 25,
      this.y + this.length * this.lengthScalar + (this.length > 0 ? 20 : 0)
    );
  }
}
