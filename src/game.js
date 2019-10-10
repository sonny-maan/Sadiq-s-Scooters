class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.canvasBG = canvasBG;
    this.contextBG = this.canvasBG.getContext("2d");
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
    dockingStation = new Rect("Docking-Station", drawX, drawY, squareSideLength, squareSideLength, "blue")
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

    // Shows updated docking station capacity
    this.world.dockingStations.forEach((ds) => {
      drawHelpers.dockingStation(canvas, this.world.map, ds)
      drawHelpers.dockingStationNumber(canvas, this.world.map, ds)
    });

    // Drawing the people!
    this.world.people.forEach(person1 => {
      drawHelpers.person(this.canvas, person1, 30)
      if (this.drawPersonPath) {
        drawHelpers.personPath(this.canvas, person1)
      }
    });


    // Shows updated docking station capacity
    let self = this;
    this.world.dockingStations.forEach(function (ds) {
      self.showDockingStation(ds) 
      let squareSideLength = 24
      let drawX = (ds.location.x * self.canvas.width) - (squareSideLength / 2)
      let drawY = (ds.location.y * self.canvas.height) - (squareSideLength / 2)
      context.fillStyle = "white";
      context.font = "12px Comic Sans MS";
      context.fillText(ds.capacity, drawX + 5, drawY + 15);
    });
    

    drawHelpers.balance(this.canvas, this.world.balance)

    drawToolBar();

    // updates the toolBar
    let peopleCount = new Rect("ppl-count", 245, 650, 100, 30, "white", this.context);
    peopleCount.draw()
    this.context.fillStyle = "black";
    this.context.font = "16px Comic Sans MS";
    this.context.fillText(`People: ${this.world.people.length}`, 255, 670);

    let peopleOnScootCount = new Rect("ppl-bike-count", 395, 650, 110, 30, "white", this.context);
    peopleOnScootCount.draw()
    this.context.fillStyle = "black";
    this.context.font = "16px Comic Sans MS";


    let riderCount = this.world.people.filter((person) => {
      return person.onVehicle()
    }).length;
    context.fillText(`On bikes: ${riderCount}`, 405, 670);





    setTimeout(() => {
      this.walkPerson();
    }, 50);
  }

}