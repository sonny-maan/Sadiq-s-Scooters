drawHelpers = {

  walkable(canvas, worldMap) {
    let ctx = canvas.getContext("2d")
    let drawX = worldMap.gridWidth * canvas.width
    let drawY = worldMap.gridHeight * canvas.height

    for (let x = 0; x < worldMap.width; x++) {
      for (let y = 0; y < worldMap.height; y++) {
        let gridLoc = {
          x: x,
          y: y
        }
        if (worldMap.isWalkable(gridLoc)) {
          ctx.fillStyle = 'rgb(0, 255, 0,0.5)'
        } else if (worldMap.isPathAdjacent(gridLoc)) {
          ctx.fillStyle = 'rgba(0, 255, 255, 0.5)'
        } else if (worldMap.isNotWalkable(gridLoc)) {
          ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
        }
        let offsetX = x * worldMap.gridWidth * canvas.width
        let offsetY = y * worldMap.gridHeight * canvas.height
        ctx.fillRect(offsetX, offsetY, drawX, drawY)
      }
    }
  },
  dsPlacement(canvas, worldMap) {
    let ctx = canvas.getContext("2d")
    let drawX = worldMap.gridWidth * canvas.width
    let drawY = worldMap.gridHeight * canvas.height
    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)'

    for (let x = 0; x < worldMap.width; x++) {
      for (let y = 0; y < worldMap.height; y++) {
        let gridLoc = {
          x: x,
          y: y
        }
        if (!worldMap.isWalkable(gridLoc) && worldMap.isPathAdjacent(gridLoc)) {
          let offsetX = x * worldMap.gridWidth * canvas.width
          let offsetY = y * worldMap.gridHeight * canvas.height
          ctx.fillRect(offsetX, offsetY, drawX, drawY)
        }
      }
    }
  },
  personPath(canvas, person) {

  }

}