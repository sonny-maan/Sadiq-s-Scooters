class PersonGenerator {
  constructor(world, avgWaitTime = 2, randomness = 0) {
    this.world = world
    this.worldMap = this.world.map
    this.walkableEdges = this.findEdges(this.worldMap) // in locations
    this.avgWaitTime = avgWaitTime * 1000
    this.randomness = randomness
    this.generating = false
  }

  randomParity() {
    return Math.random() > 0.5 ? 1 : -1
  }

  // As a user, so the world is great, I want to see  people pop into the world.
  // I want to see them appear at the edge of the world.
  // I need to find all edge gridLocs
  // pick two at random as location and destination.

  locationInGrid(gridLoc) {
    let center = this.worldMap.centerOfGrid(gridLoc)
    let randomX = center.x + (this.randomParity() * Math.random() * 0.5 * this.worldMap.gridWidth)
    let randomY = center.y + (this.randomParity() * Math.random() * 0.5 * this.worldMap.gridHeight)
    return {
      x: randomX,
      y: randomY
    }
    // return new Location(randomX, randomY)
  }



  generate() {
    let location = this.locationInGrid(this.walkableEdges[Math.floor(Math.random() * this.walkableEdges.length)]);
    let destination = this.locationInGrid(this.walkableEdges[Math.floor(Math.random() * this.walkableEdges.length)]);
    let startLoc = new Location(location.x, location.y)
    let endLoc = new Location(destination.x, destination.y)
    return this.world.generatePerson({
      location: startLoc,
      destination: endLoc,
      world: this.world,
      speed: 0.004 + (this.randomParity() * Math.random() * 0.002)
    })
  }


  generations() {
    this.generate()

    // Prepare next Run

    let time = this.avgWaitTime + (this.randomParity() * Math.random() * this.avgWaitTime * this.randomness)

    if (this.generating) {
      return setTimeout(() => {
        this.generations()
      }, time)
    } else {
      return undefined
    }
  }

  start() {
    this.generating = true

    return this.generations()
  }

  end() {
    this.generating = false
  }


  findEdges(worldMap) {
    let gWidth = worldMap.width
    let gHeight = worldMap.height
    let edges = []

    // Top and Bottom Rows
    for (let i = 0; i < gWidth; i++) {
      let gridLoc = {
        x: i,
        y: 0
      }
      if (worldMap.isWalkable(gridLoc)) {
        edges.push(gridLoc)
      }
      gridLoc = {
        x: i,
        y: gHeight - 1
      }
      if (gHeight > 1) {

        if (worldMap.isWalkable(gridLoc)) {
          edges.push(gridLoc)
        }
      }
    }
    // Left and right
    if (gHeight > 2) {
      for (let j = 1; j < gHeight - 1; j++) {
        let gridLoc = {
          x: 0,
          y: j
        }
        if (worldMap.isWalkable(gridLoc)) {
          edges.push(gridLoc)
        }
        gridLoc = {
          x: gWidth - 1,
          y: j
        }
        if (gWidth > 1) {

          if (worldMap.isWalkable(gridLoc)) {
            edges.push(gridLoc)
          }
        }
      }
    }

    return edges
  }


}