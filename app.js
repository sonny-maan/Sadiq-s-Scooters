let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;

let canvasBG = document.getElementById("canvas-bg");
let contextBG = canvasBG.getContext("2d");
canvasBG.width = 700;
canvasBG.height = 700;

let canvasOffset = canvas.getBoundingClientRect();

//buttons
let toolBarRect = new Rect("tool-bar", 0, 639, 700, 500, "black", context);
let dockingStationButton = new Rect("Docking-Station-btn", 150, 650, 23.3, 23.3, "blue", context);
// setting backgroundImage on top level

// Load assets
let backgroundImg = new Image();
backgroundImg.src = (`./assets/map.png`)

let personLeftImg = new Image()
personLeftImg.src = ("./assets/personLeft.png")
let personRightImg = new Image()
personRightImg.src = ("./assets/personRight.png")
let personUpImg = new Image()
personUpImg.src = ("./assets/personUp.png")
let personDownImg = new Image()
personDownImg.src = ("./assets/personDown.png")

let bicycleLeftImg = new Image()
bicycleLeftImg.src = ("./assets/bicycleRiderLeft.png")
let bicycleRightImg = new Image()
bicycleRightImg.src = ("./assets/bicycleRiderRight.png")
let bicycleUpImg = new Image()
bicycleUpImg.src = ("./assets/bicycleRiderUp.png")
let bicycleDownImg = new Image()
bicycleDownImg.src = ("./assets/bicycleRiderDown.png")




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

  let gridBoxWidth = game.canvas.width / window.game.world.map.width
  let gridBoxHeight = game.canvas.height / window.game.world.map.height

  let array = []
  game.world.dockingStations.forEach(function (ds) {

    if (((Math.floor(tile.x / 23.3)) == game.world.map.gridLocFromLoc(ds.location).x) && ((Math.floor(tile.y / 23.3)) == game.world.map.gridLocFromLoc(ds.location).y)) {
      array.push(ds)
      array[0].increaseCapacity()
    }
  })
}


// creates Grids on the background canvas
function createGrid() {
  drawHelpers.grid(canvasBG, window.game.world.map)
}

function setBG() {
  contextBG.drawImage(backgroundImg, 0, 0, 700, 700);
}

function drawToolBar() {
  toolBarRect.draw();
  //Docking Station Button
  dockingStationButton.draw();
  context.fillStyle = "white";
  context.font = "16px Comic Sans MS";
  context.fillText("Docking Station", 20, 670);
}

function startGame(self) {
  window.game = new Game(canvas)
  document.addEventListener('click', increaseCap, false);
  context.clearRect(0, 0, canvas.width, canvas.height);
  setBG();
  createGrid();
}