let canvas = document.getElementById("canvas");
let canvasBG = document.getElementById("canvas-bg");
let context = canvasBG.getContext("2d");
canvas.width = 700;
canvas.height = 700;
canvasBG.width = 700;
canvasBG.height = 700;
let canvasOffset = canvas.getBoundingClientRect();
//buttons
let toolBarRect = new Rect("tool-bar", 0, 639, 700, 500, "black");
let dockingStationButton = new Rect("Docking-Station-btn", 150, 650, 23.3, 23.3, "blue");
// setting backgroundImage on top level
// Load assets
let bg = new Image();
bg.src = `./assets/map.png`
let onScooterIMG = new Image()
onScooterIMG.src = ("./assets/person_scooter.png")
let walkingIMG = new Image()
walkingIMG.src = ("./assets/person.png")

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
    game.world.dockingStations.forEach(function(ds){

      if (((Math.floor(tile.x/23.3)) == game.world.map.gridLocFromLoc(ds.location).x ) &&  ((Math.floor(tile.y/23.3)) == game.world.map.gridLocFromLoc(ds.location).y )){
        array.push(ds)
        array[0].increaseCapacity()
      }
    })
  }



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
}

function setBG() {
  context.drawImage(bg, 0, 0, 700, 700);
}

function toolBar() {
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
  toolBar();

}
