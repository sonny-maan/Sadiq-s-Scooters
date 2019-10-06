class Person {
  constructor(options, imgSrc) {
    this.location = [0, 0.5]
    this.destination = [0.9999, 0.5]
    this.path = []
    this.questCompleted = false
    this.speed = 0.02
    this.imgSrc = imgSrc
    this.vehicle = undefined
    this.endDestinationVar = (this.path[0] || this.destination)
    this.world = undefined
    this.map = undefined
    this.setOptions(options)
    if (this.world) {
      this.map = this.world.map
    }
  }

  get onVehicle() {
    return (!!this.vehicle)
  }

  currentSpeed() {
    return this.onVehicle ? this.vehicle._speed : this.speed
  }

  atDestination() {
    return this.sameLoc(this.location, this.destination);
  }

  nearDestination(loc, destination, speed) {
    return (this.distance2(loc, destination) <= (speed * speed))
  }

  moveFromAToB(locA, locB, speed) {
    let direction = this.aToB(locA, locB)
    let angle = Math.atan2(direction[1], direction[0]);
    let newX = (locA[0] + (speed * Math.cos(angle)));
    let newY = (locA[1] + (speed * Math.sin(angle)));
    return [newX, newY]
  }

  offRoad(loc, map) {
    let mapCoOrd = locToMap(loc, map)
    if (map[mapCoOrd[1]][mapCoOrd[0]] === 1) {
      return true
    } else {
      return false
    }
  }

  onRoad(loc, map) {
    return !this.offRoad(loc, map)
  }

  onRoadLoc(loc, map) {
    loc = this.onCanvasLoc(loc)
    if (this.onRoad(loc, map)) {
      return loc
    }
    let mapCoord = locToMap(loc, map)
    for (let range = 0; range <= Math.max(map[0].length, map.length); range++) {
      for (let dx = -range; dx <= range; dx++) {
        for (let dy = -range; dy <= range; dy++) {
          let checkCoord = [mapCoord[0] + dx, mapCoord[1] + dy]
          if (this.onMap(checkCoord, map)) {
            if (map[checkCoord[0]][checkCoord[1]] === 0) {
              return mapToLoc(checkCoord, map)
            }
          }
        }
      }
    }
  }

  onMap(coord, map) {
    let mapWidth = map[0].length
    let mapHeight = map.length
    if (coord[0] >= 0 && coord[0] < mapWidth && coord[1] >= 0 && coord[1] < mapHeight) {
      return true
    }
    return false
  }

  offCanvas(loc) {
    return (loc[0] < 0 || loc[0] > 1 || loc[1] < 0 || loc[1] > 1)
  }
  onCanvasLoc(loc) {
    let x = loc[0]
    let y = loc[1]
    if (loc[0] < 0) {
      x = 0
    }
    if (loc[0] > 1) {
      x = 0.9999
    }
    if (loc[1] < 0) {
      y = 0
    }
    if (loc[1] > 1) {
      y = 0.9999
    }
    return [x, y]
  }



  newLocation(loc, destination, speed, map) {

    loc = this.onCanvasLoc(loc)
    let newLoc = loc
    if (map) {
      newLoc = this.onRoadLoc(loc, map)
    }

    newLoc = this.moveFromAToB(loc, destination, speed)
    if (this.nearDestination(loc, destination, speed)) {
      newLoc = destination
    }

    if (map) {
      if (this.onRoad(newLoc, map)) {
        return newLoc
      } else {
        return loc

      }
    }
    return newLoc


  }

  newDestination() {
    if (this.atDestination()) {
      return this.nextDestination()
    }
    return this.destination
  }

  nextDestination() {
    return this.path.length > 0 ? this.path.pop() : this.destination
  }

  isQuestCompleted() {
    return (this.atDestination() && this.path.length === 0)
  }

  endDestination() {
    return (this.path[0] || this.destination)
  }

  walk() {
    this.questCompleted = this.isQuestCompleted()

    this.location = this.newLocation(this.location, this.destination, this.currentSpeed(), this.map)

    this.destination = this.newDestination()

    if (this.world) {
      let directions = this.getDirections()
      this.destination = directions.pop()
      this.path = directions
    }

    return this.location
  }

  getDirections() {

    let numDockingStations = this.world.dockingStations.length
    let closestToDestination = this.closestTo(this.endDestination(), this.world.dockingStations)
    let closestToPerson = this.closestTo(this.location, this.world.dockingStations)

    if (numDockingStations >= 1 && this.onVehicle) {
      if (this.sameLoc(this.location, closestToDestination.location)) {
        closestToDestination.dock(this.world)
        this.vehicle = undefined
      }
      return [this.endDestination(), closestToDestination.location]
    }
    if (numDockingStations >= 2 && !this.onVehicle) {
      if (this.isDetourSlower(this.location, closestToPerson.location, closestToDestination.location, this.endDestination())) {
        return [this.endDestination()]
      }
      if (this.sameLoc(closestToDestination.location, closestToPerson.location) === false) {
        if (this.sameLoc(this.location, closestToPerson.location)) {
          this.vehicle = closestToPerson.release();
          return [this.endDestination(), closestToDestination.location]
        } else { // go to closest
          return [this.endDestination(), closestToDestination.location, closestToPerson.location]
        }
      }
    }

    return [this.endDestination()]

  }

  detourDistance2(currentLocation, stop1, stop2, destination) {
    let detourDistance2Calc = this.distance2(currentLocation, stop1)
    detourDistance2Calc += this.distance2(stop1, stop2) * 0.5
    detourDistance2Calc += this.distance2(stop2, destination)
    return detourDistance2Calc
  }

  isDetourSlower(currentLocation, stop1, stop2, destination) {
    return this.distance2(currentLocation, destination) <= this.detourDistance2(currentLocation, stop1, stop2, destination)
  }

  // draw() {
  //   let img = new Image();
  //   img.src = this.imgSrc;
  //   // './assets/person_scooter.png';
  //   img1.onload = function () {
  //     //draw background image
  //     ctx.drawImage(img, 0, 0);
  //   };
  // }


  // Location Helper Functions
  aToB(locA, locB) {
    return [locB[0] - locA[0], locB[1] - locA[1]]
  }
  length2(loc) {
    return (loc[0] * loc[0]) + (loc[1] * loc[1])
  }
  length(loc) {
    return Math.sqrt(this.length2(loc))
  }
  distance2(loc1, loc2) {
    return this.length2(this.aToB(loc1, loc2))
  }
  distance(loc1, loc2) {
    return Math.sqrt(this.distance2(loc1, loc2))
  }

  sameLoc(loc1, loc2) {
    if ((loc1[0] === loc2[0]) && (loc1[1] === loc2[1])) {
      return true
    }
    return false
  }

  closestTo(loc, array) {
    if (array.length === 0) {
      return undefined
    }
    let closest = array[0]
    let currentDist2 = this.distance2(loc, closest.location)
    array.forEach(element => {
      let newDist2 = this.distance2(loc, element.location)
      if (newDist2 < currentDist2) {
        closest = element
        currentDist2 = newDist2
      }
    })
    return closest
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