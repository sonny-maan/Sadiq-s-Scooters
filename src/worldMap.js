class WorldMap {

  constructor(grid, locationClass = Location) {
    this.grid = (grid || [
      [0]
    ])
    this.locationClass = locationClass


    this.width
    this.height
    this.gridWidth
    this.gridHeight
    this.diagonal = false
    this.setDimensions()
    this.graph = new Graph(this.grid)
  }

  isWalkable(gridLoc) {
    if (this.isOutsideGrid(gridLoc)) {
      return undefined
    }
    return this.grid[gridLoc.y][gridLoc.x] === 0
  }
  isNotWalkable(gridLoc) {
    if (this.isOutsideGrid(gridLoc)) {
      return undefined
    }
    return !this.isWalkable(gridLoc)
  }
  isInsideGrid(gridLoc) {
    return (gridLoc.x >= 0 && gridLoc.x < this.width && gridLoc.y >= 0 && gridLoc.y < this.height)
  }
  isOutsideGrid(gridLoc) {
    return !this.isInsideGrid(gridLoc)
  }

  isPathAdjacent(gridLoc, diagonal = this.diagonal) {
    if (this.isWalkable(gridLoc)) {
      return true
    }

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let checkGridLoc = {
          x: gridLoc.x + dx,
          y: gridLoc.y + dy
        }
        let dist = Math.abs(dx) + Math.abs(dy)
        if (this.isWalkable(checkGridLoc)) {
          if (dist <= 1 || diagonal) {
            return true
          }
        }
      }
    }

    return false

  }

  gridLocFromLoc(loc) {
    let gridX = Math.floor(loc.x / this.gridWidth)
    let gridY = Math.floor(loc.y / this.gridHeight)
    if (loc.x === 1) {
      gridX = this.width - 1
    }
    if (loc.y === 1) {
      gridY = this.height - 1
    }
    return {
      x: gridX,
      y: gridY
    }
  }

  centerOfGrid(gridLoc) {
    if (this.isOutsideGrid(gridLoc)) {
      return undefined
    }
    let locX = (gridLoc.x * this.gridWidth) + (0.5 * this.gridWidth)
    let locY = (gridLoc.y * this.gridHeight) + (0.5 * this.gridHeight)
    return new this.locationClass(locX, locY)
  }

  pathBetween(gridLocA, gridLocB) {
    let start = this.graph.nodes[gridLocA.y][gridLocA.x];
    let end = this.graph.nodes[gridLocB.y][gridLocB.x];
    let result = astar.search(this.graph.nodes, start, end);
    return result.map(pathMember => {
      return {
        x: pathMember.y,
        y: pathMember.x
      }
    }).reverse()
  }

  closestWalkable(gridLoc) {
    if (this.isWalkable(gridLoc)) {
      return gridLoc
    }
    for (let range = 0; range <= Math.max(this.height, this.width); range++) {
      for (let dx = -range; dx <= range; dx++) {
        for (let dy = -range; dy <= range; dy++) {
          let checkGridLoc = {
            x: gridLoc.x + dx,
            y: gridLoc.y + dy
          }
          if (this.isInsideGrid(checkGridLoc)) {
            if (this.isWalkable(checkGridLoc)) {
              return checkGridLoc
            }
          }
        }
      }
    }
    return undefined
  }

  makeWalkable(gridLoc) {
    this.grid[gridLoc.y][gridLoc.x] = 0
    this.graph = new Graph(this.grid)
    return gridLoc
  }

  fitToGrid(gridLoc) {
    if (this.isOutsideGrid(gridLoc)) {
      return undefined
    }
    let locX = (gridLoc.x * this.gridWidth)
    let locY = (gridLoc.y * this.gridHeight)
    return new Location(locX, locY)
  }

  centerOfGrid(gridLoc) {
    if (this.isOutsideGrid(gridLoc)) {
      return undefined
    }
    let locX = (gridLoc.x * this.gridWidth) + (0.5 * this.gridWidth)
    let locY = (gridLoc.y * this.gridHeight) + (0.5 * this.gridHeight)
    return new Location(locX, locY)
  }


  setDimensions() {
    if (this.grid.length === 0) {
      this.grid = [
        [0]
      ]
    }
    this.height = this.grid.length
    this.width = this.grid[0].length
    this.grid.forEach(row => {
      if (row.length != this.width) {
        throw 'Map grid is not correctly formatted'
      }
    });
    this.gridHeight = 1 / this.height
    this.gridWidth = 1 / this.width
    return
  }


  gridLocFromLoc(loc) {
    let gridX = Math.floor(loc.x / this.gridWidth)
    let gridY = Math.floor(loc.y / this.gridHeight)
    if (loc.x === 1) {
      gridX = 1
    }
    if (loc.y === 1) {
      gridY = 1
    }
    return {
      x: gridX,
      y: gridY
    }
  }


  setOptions(options) {
    if (options) {
      let optionKeys = Object.keys(options)
      let dockingStationKeys = Object.keys(this)

      optionKeys.forEach(optionKey => {
        if (dockingStationKeys.includes(optionKey)) {
          this[optionKey] = options[optionKey]
        }
      })
    }
  }
}