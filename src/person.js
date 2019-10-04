class Person {
  constructor(options, imgSrc) {
    this.location = [-0.01, 0.5]
    this.destination = [1.01, 0.5]
    this.path = []
    this.questCompleted = false
    this.speed = 0.02
    this.imgSrc = imgSrc
    this.vehicle
    this.endDestinationVar = (this.path[0] || this.destination)
    this.setOptions(options)


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

  nearDestination() {
    return (this.distance2(this.location, this.destination) <= (this.currentSpeed() * this.currentSpeed()))
  }

  moveFromAToB(locA, locB, speed) {
    let direction = this.aToB(locA, locB)
    let angle = Math.atan2(direction[1], direction[0]);
    let newX = (locA[0] + (speed * Math.cos(angle)));
    let newY = (locA[1] + (speed * Math.sin(angle)));
    return [newX, newY]
  }

  newLocation() {
    if (this.nearDestination()) {
      return this.destination
    }
    return this.moveFromAToB(this.location, this.destination, this.currentSpeed())
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

  walk(the_world) {
    // Look around
    // // Set destination goal ie. at destination, dock/release/next destination.

    // Interact
    // // Drop off vehicle, pick up vehicle ?
    // // Duplicating look around behaviour?

    // Move
    // // Take destination, move towards it. Update current location

    this.questCompleted = this.isQuestCompleted()
    this.location = this.newLocation()
    this.destination = this.newDestination()

    if (the_world) {

      let numDockingStations = the_world.dockingStations.length
      let closestToDestination = this.closestTo(this.destination, the_world.dockingStations)
      let closestToPerson = this.closestTo(this.location, the_world.dockingStations)

      // 1 ds, on vehicle
      if (numDockingStations >= 1 && this.onVehicle) {

        // if at this docking station
        if (this.sameLoc(this.location, closestToDestination.location)) {
          this.destination = this.endDestination()
          this.path = []
          closestToDestination.dock(the_world)
          this.vehicle = undefined
        } else { // if not there yet
          this.path = [this.endDestination()]
          this.destination = closestToDestination.location
        }
        return this.location
      }
      if (numDockingStations >= 2 && !this.onVehicle) {
        // 2 ds, not on vehicle
        // only matters if closest to person and closest to destination is different
        if (this.sameLoc(closestToDestination.location, closestToPerson.location) === false) {
          // if there:
          if (this.sameLoc(this.location, closestToPerson.location)) {
            this.path = [this.endDestination()]
            this.destination = closestToDestination.location
            this.vehicle = closestToPerson.release();
          } else { // go to closest
            this.path = [this.endDestination(), closestToDestination.location]
            this.destination = closestToPerson.location
          }
        }
        return this.location
      }
    }

    return this.location
  }

  endDestination() {
    return (this.path[0] || this.destination)
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
    return this.length2(this.aToB(loc2, loc1))
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