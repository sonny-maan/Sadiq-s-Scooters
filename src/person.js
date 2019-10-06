class Person {
  constructor(options, imgSrc) {
    this.location = new Location(0, 0.5)
    this.destination = new Location(0.9999, 0.5)
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
    return this.location.at(this.destination);
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
    return (loc.x < 0 || loc.x > 1 || loc.y < 0 || loc.y > 1)
  }
  onCanvasLoc(loc) {
    let x = loc.x
    let y = loc.y
    if (loc.x < 0) {
      x = 0
    }
    if (loc.x > 1) {
      x = 0.9999
    }
    if (loc.y < 0) {
      y = 0
    }
    if (loc.y > 1) {
      y = 0.9999
    }
    return new Location(x, y)
  }



  newLocation(loc, destination, speed, map) {

    loc = this.onCanvasLoc(loc)
    let newLoc = loc
    if (map) {
      newLoc = this.onRoadLoc(loc, map)
    }

    newLoc = loc.moveToward(destination, speed)
    if (loc.near(destination, speed)) {
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
      if (this.location.at(closestToDestination.location)) {
        closestToDestination.dock(this.world)
        this.vehicle = undefined
      }
      return [this.endDestination(), closestToDestination.location]
    }
    if (numDockingStations >= 2 && !this.onVehicle) {
      if (this.isDetourSlower(this.location, closestToPerson.location, closestToDestination.location, this.endDestination())) {
        return [this.endDestination()]
      }
      if (!closestToDestination.location.at(closestToPerson.location)) {
        if (this.location.at(closestToPerson.location)) {
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
    let detourDistance2Calc = currentLocation.distance2(stop1)
    detourDistance2Calc += stop1.distance2(stop2) * 0.5
    detourDistance2Calc += stop2.distance2(destination)
    return detourDistance2Calc
  }

  isDetourSlower(currentLocation, stop1, stop2, destination) {
    return currentLocation.distance2(destination) <= this.detourDistance2(currentLocation, stop1, stop2, destination)
  }

  closestTo(loc, array) {
    if (array.length === 0) {
      return undefined
    }
    let closest = array[0]
    let currentDist2 = loc.distance2(closest.location)
    array.forEach(element => {
      let newDist2 = loc.distance2(element.location)
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