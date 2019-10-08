class WorldMap {
  constructor(options) {
    this.grid = [
      [0]
    ]
    this.setOptions(options)
    this.width
    this.height
    this.gridWidth
    this.gridHeight

    this.setDimensions()
    this.graph = new Graph(this.grid)
  }

  isWalkable(gridLoc) {
    return this.grid[gridLoc.y][gridLoc.x] === 0
  }
  isNotWalkable(gridLoc) {
    return !this.isWalkable(gridLoc)
  }
  isInsideGrid(gridLoc) {
    return (gridLoc.x >= 0 && gridLoc.x < this.width && gridLoc.y >= 0 && gridLoc.y < this.height)
  }
  isOutsideGrid(gridLoc) {
    return !this.isInsideGrid(gridLoc)
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

  centerOfGrid(gridLoc) {
    if (this.isOutsideGrid(gridLoc)) {
      return undefined
    }
    let locX = (gridLoc.x * this.gridWidth) + (0.5 * this.gridWidth)
    let locY = (gridLoc.y * this.gridHeight) + (0.5 * this.gridHeight)
    return new Location(locX, locY)
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

  setDimensions() {
    if (this.grid.length === 0) {
      this.width = 0
      this.height = 0
      this.gridWidth = 1
      this.gridHeight = 1
      return
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