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
    this.createPerson();
    this.walkPerson();
    this.drawWalkable = false
  }

  showDockingStation(dockingStation) {
    let squareSideLength = 24
    let drawX = (dockingStation.location.x * this.canvas.width) - (squareSideLength / 2)
    let drawY = (dockingStation.location.y * this.canvas.height) - (squareSideLength / 2)
    dockingStation = new Rect("ds", drawX, drawY, squareSideLength, squareSideLength, "blue")
    dockingStation.draw()
  }

  createPerson() {
    let path = []
    let steps = Math.floor(Math.random() * 100)
    for (let i = 0; i < steps; i++) {
      path.push(new Location(Math.random(), Math.random()))
    }
    let options = {
      location: new Location(0, 0),
      destination: new Location(0, 0),
      path: path,
      speed: Math.random() / 10
    }
    this.world.generatePerson(options)
    console.log(this.world.people);
  }


  walkable(canvas, worldMap) {
    let ctx = canvas.getContext("2d")
    for (let x = 0; x < worldMap.width; x++) {
      for (let y = 0; y < worldMap.height; y++) {
        let gridLoc = {
          x: x,
          y: y
        }
        if (worldMap.isWalkable(gridLoc)) {
          ctx.fillStyle = 'rgb(255, 255, 255)'
        } else if (worldMap.isPathAdjacent(gridLoc)) {
          ctx.fillStyle = 'rgba(0, 255, 255, 1)'
        } else if (worldMap.isNotWalkable(gridLoc)) {
          ctx.fillStyle = 'rgba(255, 0, 255, 1)'
        }
        ctx.fillRect(x * canvas.width, y * canvas.height, worldMap.gridWidth, worldMap.gridHeight)
      }
    }
  }



  walkPerson() {
    // clears the canvas on each run time
    let onScooterIMG = new Image()
    onScooterIMG.src = ("./assets/person_scooter.png")
    let walkingIMG = new Image()
    walkingIMG.src = ("./assets/person.png")

    this.world.tick();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.drawWalkable) {
      drawHelpers.walkable(this.canvas, this.world.map)
    }
    // sets the font for balance
    this.context.fillStyle = "black";
    this.context.font = '28px serif';
    this.context.fillText(`£ ${this.world.balance}`, 600, 50);
    // on each tick person takes a step
    let width = 40;
    let height = 40;
    this.world.people.forEach(person1 => {
      if (person1.onVehicle) {
        // this.context.fillRect(person1.location.x * this.canvas.width, person1.location.y * this.canvas.height, width + 20, height);
        this.context.drawImage(onScooterIMG, person1.location.x * this.canvas.width, person1.location.y * this.canvas.height, width, height)
        this.context.fillStyle = "black";

      } else {
        onScooterIMG.onload = () => {
          this.context.drawImage(walkingIMG, person1.location.x * this.canvas.width, person1.location.y * this.canvas.height, width, height)
          this.context.fillStyle = "black";
        }
        //this.context.drawImage
        //this.context.fillRect(person1.location.x * this.canvas.width, person1.location.y * this.canvas.height, width, height);
      }
      // TO BE TAKEN OUT LATER
      // draw lines to see where people are going.
      // does not affect the people or world at all
      this.context.lineWidth = 1
      this.context.strokeStyle = 'red'
      this.context.beginPath();
      this.context.moveTo(person1.location.x * this.canvas.width, person1.location.y * this.canvas.height);
      this.context.lineTo(person1.destination.x * this.canvas.width, person1.destination.y * this.canvas.height);
      this.context.stroke();

      if (person1.path[0]) {
        this.context.strokeStyle = 'green'
        this.context.beginPath();

        this.context.moveTo(person1.location.x * this.canvas.width, person1.location.y * this.canvas.height);
        this.context.lineTo(person1.path[0].x * this.canvas.width, person1.path[0].y * this.canvas.height);
        this.context.stroke();
        this.context.strokeStyle = 'blue'
        this.context.beginPath();
        this.context.moveTo(person1.destination.x * this.canvas.width, person1.destination.y * this.canvas.height);
        this.context.lineTo(person1.path[0].x * this.canvas.width, person1.path[0].y * this.canvas.height);
        this.context.stroke();
      }

    });
    setTimeout(() => {
      this.walkPerson();
    }, 50);
  }




}