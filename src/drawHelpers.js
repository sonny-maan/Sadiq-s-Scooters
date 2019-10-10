drawHelpers = {
  person(canvas, person, size = 30) {
    let ctx = canvas.getContext("2d")
    ctx.fillStyle = "black";
    let offsetX = (person.location.x * canvas.width) - (size / 2)
    let offsetY = (person.location.y * canvas.width) - (size / 2)
    if (person.onVehicle()) {
      ctx.drawImage(onScooterIMG, offsetX, offsetY, size, size)
    } else {
      ctx.drawImage(walkingIMG, offsetX, offsetY, size, size)
    }
  },
  balance(canvas, balance) {
    let ctx = canvas.getContext("2d")
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(578, 16, 100, 50)
    ctx.fillStyle = "black";
    ctx.font = '28px serif';
    ctx.fillText(`£ ${balance}`, 590, 50);
  },

  personPath(canvas, person) {
    let ctx = canvas.getContext("2d")

    ctx.lineWidth = 1.5
    ctx.strokeStyle = `rgba(0,255,0,0.5)`
    ctx.beginPath();
    ctx.moveTo(person.location.x * canvas.width, person.location.y * canvas.width);
    ctx.lineTo(person.destination.x * canvas.width, person.destination.y * canvas.width);
    ctx.stroke();

    let fromX = person.destination.x * canvas.width
    let fromY = person.destination.y * canvas.width

    let pathNum = 1
    person.path.slice().reverse().forEach((loc) => {
      let toX = loc.x * canvas.width
      let toY = loc.y * canvas.width
      let r = 255
      let g = 255 - Math.floor(255 - pathNum * 8)
      let b = 255 - Math.floor(255 - pathNum * 8)
      ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)'
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
      fromX = toX || fromX
      fromY = toY || fromY
      pathNum++
    })

  },

  walkable(canvas, worldMap) {
    let ctx = canvas.getContext("2d")
    let drawX = worldMap.gridWidth * canvas.width
    let drawY = worldMap.gridHeight * canvas.width

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
        let offsetY = y * worldMap.gridHeight * canvas.width
        ctx.fillRect(offsetX, offsetY, drawX, drawY)
      }
    }
  },

  dsPlacement(canvas, worldMap) {
    let ctx = canvas.getContext("2d")
    let drawX = worldMap.gridWidth * canvas.width
    let drawY = worldMap.gridHeight * canvas.width
    ctx.fillStyle = 'rgba(0, 255, 0, 0.6)'

    for (let x = 0; x < worldMap.width; x++) {
      for (let y = 0; y < worldMap.height; y++) {
        let gridLoc = {
          x: x,
          y: y
        }
        if (worldMap.isNotWalkable(gridLoc) && worldMap.isPathAdjacent(gridLoc)) {
          let offsetX = x * worldMap.gridWidth * canvas.width
          let offsetY = y * worldMap.gridHeight * canvas.width
          ctx.fillRect(offsetX, offsetY, drawX, drawY)
        }
      }
    }
  },

  grid(canvas, worldMap) {
    let ctx = canvas.getContext("2d")
    let gridBoxWidth = canvas.width * worldMap.gridWidth
    let gridBoxHeight = canvas.width * worldMap.gridHeight
    ctx.lineWidth = 0.5
    ctx.strokeStyle = 'rgba(200,200,200,0.7)'
    for (i = 0; i <= canvas.width; i += gridBoxWidth) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.width);
      ctx.stroke();
    }
    for (i = 0; i <= canvas.width; i += gridBoxHeight) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
  },

  dockingStation(canvas, worldMap, dockingStation) {
    let ctx = canvas.getContext("2d")
    let squareSideLength = worldMap.gridWidth * canvas.width
    let offsetX = (dockingStation.location.x * canvas.width) - (squareSideLength / 2)
    let offsetY = (dockingStation.location.y * canvas.width) - (squareSideLength / 2)
    ctx.fillStyle = "blue"
    if (dockingStation.capacity === dockingStation.dockedVehicles) {
      ctx.fillStyle = "purple"
    } else if (dockingStation.dockedVehicles === 0) {
      ctx.fillStyle = "red"
    }
    ctx.fillRect(offsetX, offsetY, squareSideLength, squareSideLength)
  },

  dockingStationNumber(canvas, worldMap, dockingStation) {
    let ctx = canvas.getContext("2d")
    let squareSideLength = worldMap.gridWidth * canvas.width
    let offsetX = (dockingStation.location.x * canvas.width) - (squareSideLength / 2)
    let offsetY = (dockingStation.location.y * canvas.width) - (squareSideLength / 2)
    ctx.fillStyle = "white";
    // ctx.font = `${Math.floor(squareSideLength/2)}px Comic Sans MS`;
    ctx.font = `12px Comic Sans MS`;
    ctx.fillText(dockingStation.dockedVehicles, offsetX + 5, offsetY + 15);
  },
  dockingStationCopy(canvas, worldMap, location) {
    let ctx = canvas.getContext("2d")
    let squareSideLength = worldMap.gridWidth * canvas.width
    let offsetX = (location.x) - (squareSideLength / 2)
    let offsetY = (location.y) - (squareSideLength / 2)
    ctx.fillStyle = "blue"
    ctx.fillRect(offsetX, offsetY, squareSideLength, squareSideLength)
  },
  toolBar(canvas) {

  }

}