class Rect{
  constructor(id,x,y,width,height,fill) {
    this.x=x;
    this.y=y;
    this.id=id;
    this.width=width;
    this.height=height;
    this.fill=fill;
  }

  draw(){
    context.save();
    context.beginPath();
    context.fillStyle = this.fill;
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.fill();
    context.restore();
}

isPointInside(x,y){
  return( x >= this.x 
          && x <= this.x + this.width
          && y >= this.y
          && y <= this.y + this.height);
}

}

