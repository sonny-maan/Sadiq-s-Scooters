class Person {
  constructor(options) {
    // Can be supplied
    this.location = new Location(0, 0.5)
    this.destination = new Location(0.9999, 0.5)
    this.speed = 0.02
    // Used
    this.path = []
    this.questCompleted = false
    this.vehicle = undefined
    this.world = undefined
    this.worldMap = undefined
    this.setOptions(options)
    if (this.world) {
      this.worldMap = this.world.map
    }
    console.log(this.location)
    this.location = this.location.moveToOnMap()
    this.destination = this.destination.moveToOnMap()
    this.personDirections = new PersonDirections(this.world, this)

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

    let directions = this.personDirections.getNewDirections()
    this.destination = directions.pop()
    this.path = directions

    return this.location
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