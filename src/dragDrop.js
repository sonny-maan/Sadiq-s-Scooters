class DragDrop {
  constructor(game) {
    this.game = game
    this.canvasOffset = this.game.canvas.getBoundingClientRect();
    this.selection;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.mouse = {
      x: 0,
      y: 0
    };
    this.init();
  }

  init() {
    this.game.canvas.addEventListener('mousemove', (event) => {
      this.updateMousePos(event);
      if (this.selection) {
        this.selection.x = this.mouse.x - this.dragOffsetX;
        this.selection.y = this.mouse.y - this.dragOffsetY;
        this.reDrawEverything()
        let dockingStationCopy = new Rect("Docking-Station", this.selection.x, this.selection.y, 23.3, 23.3, "blue");
        dockingStationCopy.draw()
      }
    }, true);

    this.game.canvas.addEventListener('mouseup', (event) => {
      if (this.isOccupied(this.mouse, this.ds)) return;
      if (this.mouse.y > 650) return;

      let tile = this.findTile();

      this.selection.y = tile.y;
      this.selection.x = tile.x;

      let dsX = this.mouse.x / canvas.width
      let dsY = this.mouse.y / canvas.height
      let loc = new Location(dsX, dsY)

      let gridLoc = this.game.world.map.gridLocFromLoc(loc)
      let centerOfGridDS = this.game.world.map.centerOfGrid(gridLoc)
      let newDs = this.game.world.generateDockingStation({
        location: centerOfGridDS
      }, true)
      if (newDs) {

        this.game.showDockingStation(newDs)
      }

      this.reDrawEverything();
      this.selection.isActive = true;
      this.selection = null;
    }, true);

    this.game.canvas.addEventListener('mousedown', (event) => {

      if (this.game.dragDrop.selection) return;
      if (!(this.mouse.y >= 650 && this.mouse.y <= 700)) return; // not in toolbar!

      let dockingStationButton;

      if (this.mouse.x >= 150 && this.mouse.x < 170 && this.game.world.balance === 0) {
        alert("Your Balance is Empty: you must earn more money")

      } else if (this.mouse.x >= 150 && this.mouse.x < 170) {
        dockingStationButton = new Rect("Docking-Station", 150, 650, 23.3, 23.3, "red");
        dockingStationButton.draw()

      } else {
        return;
      }

      this.selection = dockingStationButton;
      this.dragOffsetX = this.mouse.x - dockingStationButton.x;
      this.dragOffsetY = this.mouse.y - dockingStationButton.y;
    }, true);
  }

  updateMousePos(event) {
    this.mouse.x = (event.clientX - this.canvasOffset.left) / (this.canvasOffset.right - this.canvasOffset.left) * canvas.width;
    this.mouse.y = (event.clientY - this.canvasOffset.top) / (this.canvasOffset.bottom - this.canvasOffset.top) * canvas.height;
  }

  isOccupied() {
    let tile = this.findTile();
    return this.game.world.dockingStations.reverse().some((ds) => ds.x == tile.x && ds.y == tile.y);
  }

  findTile() {
    let gridBoxWidth = this.game.canvas.width / window.game.world.map.width
    let gridBoxHeight = this.game.canvas.height / window.game.world.map.height
    return {
      x: Math.floor(this.mouse.x / gridBoxWidth) * gridBoxWidth,
      y: Math.floor(this.mouse.y / gridBoxHeight) * gridBoxHeight
    };
  }

  reDrawEverything() {
    setBG();
    createGrid();
    toolBar();
    this.game.world.dockingStations.forEach((ds) => {
      this.game.showDockingStation(ds)
    })

  }
}
