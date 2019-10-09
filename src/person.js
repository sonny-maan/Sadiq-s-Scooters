class Person {
  constructor(world, options) {
    this.world = world
    this.worldMap = this.world.map
    // Can be supplied
    this.location = new Location(0, 0.5)
    this.destination = new Location(0.9999, 0.5)
    this.speed = 0.02
    // Used
    this.path = []
    this.questCompleted = false
    this.vehicle = undefined
    this.personDirections = new PersonDirections(this.world, this)
    // Set Dem Options
    util.setOptions(this, options)
    // Clean Up
    this.location = this.location.moveToOnMap()
    this.destination = this.destination.moveToOnMap()
  }

  walk() {
    let directions = this.personDirections.getNewDirections()
    this.destination = directions.pop()
    this.path = directions


    this.questCompleted = this.isQuestCompleted()
    this.location = this.newLocation(this.location, this.destination, this.currentSpeed(), this.worldMap)
    this.destination = this.newDestination()


    return this.location
  }

  onVehicle() {
    return (!!this.vehicle)
  }

  currentSpeed() {
    return this.onVehicle() ? this.vehicle.speed : this.speed
  }

  atDestination() {
    return this.location.at(this.destination);
  }

  newLocation(loc, destination, speed, worldMap) {
    let newLoc = loc.near(destination, speed) ? destination : loc.moveToward(destination, speed)
    newLoc = newLoc.moveToOnMap()
    let newGridLoc = worldMap.gridLocFromLoc(newLoc)
    if (worldMap.isWalkable(newGridLoc)) {
      return newLoc
    } else {
      return loc
    }
  }

  newDestination() {
    return this.atDestination() ? this.nextDestination() : this.destination
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

}