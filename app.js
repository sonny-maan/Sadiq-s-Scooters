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
let resetButton = new Rect("reset-btn",10, 650, 70, 30,"red");
let dockingStationButton = new Rect("ds-btn",90, 650, 70, 30,"blue");

window.onload = () => {
  console.log("page refreshed")
  startMenu();
  document.addEventListener('click', playBtn, false);
};

// menu to show at start of the game
function startMenu(){
    let img = new Image();
    img.src = ("./assets/bg.png");
    img.onload = () => {
      context.drawImage(img, 0, 0, 800, 700, 0, 0, 800, 700)
      context.fillStyle = "black";
      context.font = "30px Comic Sans MS";
      context.fillText("Play", 358, 210);
    }
}

// button to play the game
function playBtn(e) {
  mouseX = e.pageX - canvasOffset.left;
  mouseY = e.pageY - canvasOffset.top;
  if (playButton.isPointInside(mouseX, mouseY)) {
  startGame(this);
  }
}

function dockingStationBtn(e) {
  mouseX = e.pageX - canvasOffset.left;
  mouseY = e.pageY - canvasOffset.top;
  if (dockingStationButton.isPointInside(mouseX, mouseY)) {
  game.createDockingStation();

  }
}

// creates Grids on the background canvas
function createGrid() {
  for(i = 0; i <= 700; i += 28) {
    context.moveTo(i, 0);
    context.lineTo(i, 700);
    context.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    context.stroke();
  }

  for(i = 0; i <= 700; i += 28) {
    context.moveTo(0, i);
    context.lineTo(700, i);
    context.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    context.stroke();
  }
};

function setBG(imgName, callback) {
  let bg = new Image();
  bg.src = `./assets/${imgName}`
  bg.onload = function() {
    context.drawImage(bg, 0, 0, 700, 700);
    callback.call();
  }
}

function toolBar(){
  toolBarRect.draw();
  //Reset Button
  resetButton.draw();
  context.fillStyle = "black";
  context.font = "20px Comic Sans MS";
  context.fillText("Reset", 20, 670);
  //Docking Station Button
  dockingStationButton.draw();
  context.fillStyle = "black";
  context.font = "20px Comic Sans MS";
  context.fillText("DS", 100, 670);
}

// button to reset the game
function resetBtn(e) {
  mouseX = e.pageX - canvasOffset.left;
  mouseY = e.pageY - canvasOffset.top;
  if (resetButton.isPointInside(mouseX, mouseY)) {
    location.reload()
  }
}

function dockingStationBtn(e) {
  mouseX = e.pageX - canvasOffset.left;
  mouseY = e.pageY - canvasOffset.top;
  if (dockingStationButton.isPointInside(mouseX, mouseY)) {
    let game = new Game(canvas)
    game.createDockingStation();
  }
}

function startGame(self) {
  document.addEventListener('click', playBtn, false);
  document.addEventListener('click', resetBtn, false);
  window.game = new Game(canvas)
  document.addEventListener('click', dockingStationBtn, false);
  dockingStationBtn(canvas)
  context.clearRect(0, 0, canvas.width, canvas.height);
  dockingStationBtn(canvas, game)
  setBG('map.png', createGrid);
  toolBar();
}
