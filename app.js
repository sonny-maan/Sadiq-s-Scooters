let canvas = document.getElementById("canvas");
let canvasBG = document.getElementById("canvas-bg");
let context = canvasBG.getContext("2d");
canvas.width = 700;
canvas.height = 700;
canvasBG.width = 700;
canvasBG.height = 700;
let canvasOffset = canvas.getBoundingClientRect();
//buttons
let toolBarRect = new Rect("tool-bar",0, 639, 700, 500,"black");
let dockingStationButton = new Rect("ds-btn",90, 650, 23.3, 23.3,"blue");
// setting backgroundImage on top level
let bg = new Image();
bg.src = `./assets/map.png`


window.onload = () => {
  startGame(self);
};

// setting backgroundImage on top level
function findTile() {
  let gridBoxWidth = game.canvas.width / window.game.world.map.width
  let gridBoxHeight = game.canvas.height / window.game.world.map.height
  return {
    x: Math.floor(this.mouseX / gridBoxWidth) * gridBoxWidth,
    y: Math.floor(this.mouseY / gridBoxHeight) * gridBoxHeight
  };
}

function increaseCap(e) {
  mouseX = e.pageX - canvasOffset.left;
  mouseY = e.pageY - canvasOffset.top;
  let tile = findTile();

  game.world._dockingStations.filter((ds) => (ds.location.x - tile.x < 30) && (ds.location.y - tile.y < 30))
  console.log(tile)

  console.log('registering')
  console.log(window.game.world.map.width)

  console.log(game.world._dockingStations.filter((ds) => (ds.location.x - tile.x < -350) && (ds.location.y - tile.y < -350)))
  }
  // mouseX = e.pageX - canvasOffset.left;
  // mouseY = e.pageY - canvasOffset.top;

  //
  // if (canvas.isPointInside(mouseX, mouseY)) {
  //   let tile = this.findTile();
  //   console.log(game.world._dockingStations.select((ds) => ds.location.x == tile.x && ds.location.y == tile.y))
  //   console.log(this)


// creates Grids on the background canvas
function createGrid() {
  let gridBoxWidth = canvas.width / window.game.world.map.width
  let gridBoxHeight = canvas.height / window.game.world.map.height
  for (i = 0; i <= 700; i += gridBoxWidth) {
    context.moveTo(i, 0);
    context.lineTo(i, 700);
    context.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    context.stroke();
  }

  for (i = 0; i <= 700; i += gridBoxHeight) {
    context.moveTo(0, i);
    context.lineTo(700, i);
    context.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    context.stroke();
  }
};

function setBG() {
  context.drawImage(bg, 0, 0, 700, 700);
}

function toolBar() {
  toolBarRect.draw();
  //Docking Station Button
  dockingStationButton.draw();
  context.fillStyle = "black";
  context.font = "20px Comic Sans MS";
  context.fillText("DS", 100, 670);
}

function startGame(self) {
  window.game = new Game(canvas)
  context.clearRect(0, 0, canvas.width, canvas.height);
  setBG();
  createGrid();
  toolBar();

}
