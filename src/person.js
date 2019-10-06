class Person {
  constructor(options, imgSrc) {
    this.location = new Location(0, 0.5)
    this.destination = new Location(0.9999, 0.5)
    this.path = []
    this.questCompleted = false
    this.speed = 0.002
    this.imgSrc = imgSrc
    this.vehicle = undefined
    this.endDestinationVar = (this.path[0] || this.destination)
    this.world = undefined
    this.worldMap = undefined
    this.setOptions(options)
    if (this.world) {
      this.worldMap = this.world.map
    }
    this.location = this.location.moveToOnMap()
    this.destination = this.destination.moveToOnMap()

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


  newLocation(loc, destination, speed, worldMap) {
    loc = loc.moveToOnMap()
    let newLoc = loc
    if (worldMap) {
      let gridLoc = worldMap.gridLocFromLoc(loc)
      if (worldMap.isNotWalkable(gridLoc)) {
        newLoc = worldMap.centerOfGrid(worldMap.closestWalkable(gridLoc))
      }
    }

    newLoc = loc.moveToward(destination, speed)
    if (loc.near(destination, speed)) {
      newLoc = destination
    }

    if (worldMap) {
      let gridLoc = worldMap.gridLocFromLoc(newLoc)
      if (worldMap.isWalkable(gridLoc)) {
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

    this.location = this.newLocation(this.location, this.destination, this.currentSpeed(), this.worldMap)

    this.destination = this.newDestination()

    if (this.world) {
      let directions = this.getDirections()
      this.destination = directions.pop()
      this.path = directions

      if (this.worldMap) {
        let otherDirections = this.getOtherDirections()
        otherDirections = otherDirections.filter(e => {
          return e != undefined
        })
        otherDirections = otherDirections.map((element) => {
          return new Location(element.x, element.y)
        })
        this.destination = otherDirections.pop()
        this.path = otherDirections
      }
    }

    return this.location
  }

  getDirections() {

    let numDockingStations = this.world.dockingStations.length
    let closestToPerson = this.closestTo(this.location, this.world.dockingStations)
    let closestToDestination = this.closestTo(this.endDestination(), this.world.dockingStations)

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



  getOtherDirections() {

    let closestToPerson = this.shortestPathTo(this.location, this.world.dockingStations)
    let closestToDestination = this.shortestPathTo(this.endDestination(), this.world.dockingStations)

    if (closestToDestination != undefined && this.onVehicle) {
      if (this.location.at(closestToDestination.location)) {
        closestToDestination.dock(this.world)
        this.vehicle = undefined
      }
      let gridPath = this.locPathBetween(this.location, closestToDestination.location)
      return [this.endDestination(), closestToDestination.location, ...gridPath]
    }
    if (closestToPerson != undefined && closestToDestination != undefined && !this.onVehicle) {

      if (this.isDetourPathSlower(this.location, closestToPerson.location, closestToDestination.location, this.endDestination())) {

        let gridPath = this.locPathBetween(this.location, this.endDestination())
        return [this.endDestination(), ...gridPath]
      }
      if (!closestToDestination.location.at(closestToPerson.location)) {
        if (this.location.at(closestToPerson.location)) {
          this.vehicle = closestToPerson.release();
          let gridPath = this.locPathBetween(this.location, closestToDestination.location)
          return [this.endDestination(), closestToDestination.location, ...gridPath]
        } else { // go to closest

          let gridPath = this.locPathBetween(this.location, closestToPerson.location)
          return [this.endDestination(), closestToDestination.location, closestToPerson.location, ...gridPath]
        }
      }
    }

    return [this.endDestination(), ...this.locPathBetween(this.location, this.endDestination())]
  }

  shortestPathTo(loc, array) {
    //Check for elements in the same grid first
    let closest
    array.forEach((element) => {
      if (this.sameGridLoc(loc, element.location)) {

        closest = element
      }
    })
    if (closest) {
      return closest
    }
    // Then filter to only walkable ones
    array = array.filter((element) => {
      return this.isWalkable(element.location)
    })
    // break if nothing to check
    if (array.length === 0) {
      return undefined
    }

    let currentPathLength
    array.forEach(element => {
      let newPathLength = this.locPathBetween(loc, element.location).length
      if ((newPathLength < currentPathLength || currentPathLength === undefined) && newPathLength > 0) {
        closest = element
        currentPathLength = newPathLength
      }
    })
    return closest
  }

  isDetourPathSlower(currentLocation, stop1, stop2, destination) {
    if (this.sameGridLoc(currentLocation, destination)) {
      return true
    }
    if (this.sameGridLoc(currentLocation, stop1)) {
      return false
    }

    return this.locPathBetween(currentLocation, destination).length <= this.detourPathLength(currentLocation, stop1, stop2, destination)
  }


  detourPathLength(currentLocation, stop1, stop2, destination) {
    let detourDistance2Calc = this.locPathBetween(currentLocation, stop1).length
    detourDistance2Calc += this.locPathBetween(stop1, stop2).length * 0.5
    detourDistance2Calc += this.locPathBetween(stop2, destination).length

    return detourDistance2Calc
  }

  locPathBetween(loc1, loc2) {
    let gridLoc1 = this.worldMap.gridLocFromLoc(loc1)
    let gridLoc2 = this.worldMap.gridLocFromLoc(loc2)
    return this.worldMap.pathBetween(gridLoc1, gridLoc2).map(element => {
      return this.worldMap.centerOfGrid(element)
    })
  }
  sameGridLoc(loc1, loc2) {
    let gridLoc1 = this.worldMap.gridLocFromLoc(loc1)
    let gridLoc2 = this.worldMap.gridLocFromLoc(loc2)

    return (gridLoc1.x === gridLoc2.x && gridLoc1.y == gridLoc2.y)
  }

  isWalkable(loc) {
    return this.worldMap.isWalkable(this.worldMap.gridLocFromLoc(loc))
  }

}