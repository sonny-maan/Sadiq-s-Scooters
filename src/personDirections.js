class PersonDirections {
  constructor(world, person) {
    this.world = world
    if (this.world) {
      this.worldMap = world.map
    }
    this.person = person
  }

  getNewDirections() {

    let directions = [this.person.endDestination()]
    if (this.world) {
      directions = this.getDirections()


      if (this.worldMap) {
        directions = this.getOtherDirections()
        directions = directions.filter(e => {
          return e != undefined
        })
        directions = directions.map((element) => {
          return new Location(element.x, element.y)
        })

      }
    }
    return directions
  }

  getDirections() {

    let numDockingStations = this.world.dockingStations.length
    let closestToPerson = this.closestTo(this.person.location, this.world.dockingStations)
    let closestToDestination = this.closestTo(this.person.endDestination(), this.world.dockingStations)

    if (numDockingStations >= 1 && this.person.onVehicle()) {
      if (this.person.location.at(closestToDestination.location)) {
        if (closestToDestination.dock(this.world)) {
          this.person.vehicle = undefined
        }
      }
      return [this.person.endDestination(), closestToDestination.location]
    }
    if (numDockingStations >= 2 && !this.person.onVehicle()) {
      if (this.isDetourSlower(this.person.location, closestToPerson.location, closestToDestination.location, this.person.endDestination())) {
        return [this.person.endDestination()]
      }
      if (!closestToDestination.location.at(closestToPerson.location)) {
        if (this.person.location.at(closestToPerson.location)) {
          this.person.vehicle = closestToPerson.release();
          return [this.person.endDestination(), closestToDestination.location]
        } else { // go to closest
          return [this.person.endDestination(), closestToDestination.location, closestToPerson.location]
        }
      }
    }

    return [this.person.endDestination()]

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


  getOtherDirections() {

    let closestToPerson = this.shortestPathTo(this.person.location, this.world.dockingStations)
    let closestToDestination = this.shortestPathTo(this.person.endDestination(), this.world.dockingStations)

    if (closestToDestination != undefined && this.person.onVehicle()) {
      if (this.person.location.at(closestToDestination.location)) {
        if (closestToDestination.dock(this.world)) {
          this.person.vehicle = undefined
        }
      }
      let gridPath = this.locPathBetween(this.person.location, closestToDestination.location)
      return [this.person.endDestination(), closestToDestination.location, ...gridPath]
    }
    if (closestToPerson != undefined && closestToDestination != undefined && !this.person.onVehicle()) {

      if (this.isDetourPathSlower(this.person.location, closestToPerson.location, closestToDestination.location, this.person.endDestination())) {

        let gridPath = this.locPathBetween(this.person.location, this.person.endDestination())
        return [this.person.endDestination(), ...gridPath]
      }
      if (!closestToDestination.location.at(closestToPerson.location)) {
        if (this.person.location.at(closestToPerson.location)) {
          this.person.vehicle = closestToPerson.release();
          let gridPath = this.locPathBetween(this.person.location, closestToDestination.location)
          return [this.person.endDestination(), closestToDestination.location, ...gridPath]
        } else { // go to closest

          let gridPath = this.locPathBetween(this.person.location, closestToPerson.location)
          return [this.person.endDestination(), closestToDestination.location, closestToPerson.location, ...gridPath]
        }
      }
    }

    return [this.person.endDestination(), ...this.locPathBetween(this.person.location, this.person.endDestination())]
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
    let detourDistance2Calc = this.locPathBetween(currentLocation, stop1).length + 1
    detourDistance2Calc += (this.locPathBetween(stop1, stop2).length * 0.5) + 0.5
    detourDistance2Calc += this.locPathBetween(stop2, destination).length + 1

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