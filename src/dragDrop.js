class DragDrop{
  constructor(game){
    this.game = game
    this.canvasOffset = this.game.canvasBG.getBoundingClientRect();
    this.selection;
    this.DSbutton = dockingStationButton;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.game.canvas.addEventListener('mousemove', (event) => {
      this.updateMousePos(event);
      if (this.selection) {
        this.selection.x = this.mouse.x - this.dragOffsetX;
        this.selection.y = this.mouse.y - this.dragOffsetY;
      }
    }, true);

    this.game.canvas.addEventListener('mousedown', (event) => {
      if(this.game.dragDrop.selection) return;
      // if(!(this.mouse.y >= 600 && this.mouse.y <= 700)) return; // not in toolbar!


      let gridBoxWidth = this.game.canvas.width / window.game.world.map.width
      let gridBoxHeight = this.game.canvas.height / window.game.world.map.height

      if (this.mouse.x >= 0 && this.mouse.x < gridBoxWidth) {
        dockingStationButton = this.game.createDockingStation() 
      } else {
        return; // RETURN IF 'NULL' IS SELECTED - WILL CRASH IF REMOVED
      }


  

      this.selection = dockingStationButton;
      console.log(this.selection)
      this.dragOffsetX = this.mouse.x - dockingStationButton.x;
      this.dragOffsetY = this.mouse.y - dockingStationButton.y;
    }, true);

    this.game.canvas.addEventListener('mouseup', dockingStationBtn, (event) => {
      if (this.isOccupied(this.mouse, this.DSbutton)) return;
      if (this.mouse.y > 600) return;

      let tile = this.findTile();

      this.selection.y = tile.y;
      this.selection.x = tile.x < gridBoxWidth ? tile.x + gridBoxWidth : tile.x;
      this.selection.isActive = true;
      this.selection = null;
    }, true);

  }

  updateMousePos(event) {
    this.mouse.x = (event.clientX - this.canvasOffset.left) / (this.canvasOffset.right - this.canvasOffset.left) * canvas.width;
    this.mouse.y = (event.clientY - this.canvasOffset.top) / (this.canvasOffset.bottom - this.canvasOffset.top) * canvas.height;
  }

  isOccupied() {
    let tile = this.findTile();
    return this.game.world._dockingStations.reverse().some(() => dockingStationButton.x == tile.x && dockingStationButton.y == tile.y);
  }

  findTile() {
    let gridBoxWidth = this.game.canvas.width / window.game.world.map.width
    let gridBoxHeight = this.game.canvas.height / window.game.world.map.height
    return {
      x: Math.floor(this.mouse.x / gridBoxWidth) * gridBoxWidth,
      y: Math.floor(this.mouse.y / gridBoxHeight) * gridBoxHeight
    };
  }
}