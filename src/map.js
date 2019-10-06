class Map {
  constructor(options) {
    this.grid = []
    this.setOptions(options)
    this.width
    this.height
    this.gridWidth
    this.gridHeight

    this.setDimensions()
    this.graph = new Graph(this.grid)
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

  isOutsideGrid(gridLoc) {
    return (gridLoc.x < 0 || gridLoc.x >= this.width || gridLoc.y < 0 || gridLoc.y >= this.height)
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