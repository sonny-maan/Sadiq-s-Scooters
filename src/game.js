class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasBG = canvasBG;
    this.contextBG = this.canvasBG.getContext("2d");
    this.context = this.canvas.getContext("2d");
    this.world = new World({
      map: new WorldMap(maps.map1.grid)
    })
    this.world.personGenerator.start()
    this.dragDrop = new DragDrop(this);

    this.drawWalkable = false
    this.drawDsPlacement = false
    this.drawPersonPath = false


    this.walkPerson();
  }

  showDockingStation(dockingStation) {
    let squareSideLength = 24
    let drawX = (dockingStation.location.x * this.canvas.width) - (squareSideLength / 2)
    let drawY = (dockingStation.location.y * this.canvas.height) - (squareSideLength / 2)
    dockingStation = new Rect("ds", drawX, drawY, squareSideLength, squareSideLength, "blue")
    dockingStation.draw()
  }

  walkPerson() {
    this.world.tick();

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Shows which squares are walkable, next to walkable, and neither
    if (this.drawWalkable) {
      drawHelpers.walkable(this.canvas, this.world.map)
    }
    // Shows the squares where the docking stations can be placed
    if (this.drawDsPlacement) {
      drawHelpers.dsPlacement(this.canvas, this.world.map)
    }
    // Drawing the people!
    this.world.people.forEach(person1 => {
      drawHelpers.person(this.canvas, person1, 30)
      if (this.drawPersonPath) {
        drawHelpers.personPath(this.canvas, person1)
      }
    });

    drawHelpers.balance(this.canvas, this.world.balance)

    setTimeout(() => {
      this.walkPerson();
    }, 50);
  }

}