class Rect {
  constructor(id, x, y, width, height, fill, context) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.context = context
  }

  draw() {
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = this.fill;
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.stroke();
    this.context.fill();
    this.context.restore();
  }

  isPointInside(x, y) {
    return (x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height);
  }

}