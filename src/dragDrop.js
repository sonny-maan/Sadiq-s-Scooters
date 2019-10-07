class DragDrop{
  constructor(game){
    this.game = game
    this.canvasOffset = this.game.canvasBG.getBoundingClientRect();
    this.mouse = { x: 0, y: 0 };
  }

  findTile() {
    return {
      x: Math.floor(this.mouse.x / 28) * 28,
      y: Math.floor(this.mouse.y / 28) * 28
    };
  }
}