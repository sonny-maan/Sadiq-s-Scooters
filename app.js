let canvas = document.getElementById("canvas");
let canvasBG = document.getElementById("canvas-bg");
let context = canvasBG.getContext("2d");
canvas.width = 700;
canvas.height = 700;
canvasBG.width = 700;
canvasBG.height = 700;
let canvasOffset = canvas.getBoundingClientRect();
//buttons
let playButton = new Rect("play-btn",300,200,100,50,"blue");
let toolBarRect = new Rect("tool-bar",0, 639, 700, 500,"black");
let dockingStationButton = new Rect("ds-btn",90, 650, 70, 30,"blue");
// setting backgroundImage on top level
let bg = new Image();
bg.src = `./assets/map.png`

window.onload = () => {
  startGame(self)
};

// menu to show at start of the game
function startMenu() {
  let img = new Image();
  img.src = ("./assets/bg.png");
  img.onload = () => {
    context.drawImage(img, 0, 0, 800, 700, 0, 0, 800, 700)
    context.fillStyle = "black";
    context.font = "30px Comic Sans MS";
    context.fillText("Play", 358, 210);
  }
}

// creates Grids on the background canvas
function createGrid() {
  let gridBoxWidth = canvas.width / window.game.world.map.width
  let gridBoxHeight = canvas.height / window.game.world.map.height
  for(i = 0; i <= 700; i += gridBoxWidth) {
    context.moveTo(i, 0);
    context.lineTo(i, 700);
    context.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    context.stroke();
  }

  for(i = 0; i <= 700; i += gridBoxHeight) {
    context.moveTo(0, i);
    context.lineTo(700, i);
    context.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    context.stroke();
  }
};

function setBG(callback) {
  context.drawImage(bg, 0, 0, 700, 700);
  bg.onload = function() {
    callback.call();
  }
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

