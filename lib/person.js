class Person {
  constructor(options, imgSrc) {

    // default properties
    this._location = [-0.01, 0.5]
    this._destination = [1.01, 0.5]
    this._speed = 0.02
    this._questCompleted = false
    this._path = []
    this.imgSrc = imgSrc
    this._vehicle
    // this.planetEarth = options['planetEarth']

    // overwrite from options
    if (options) {
      if (Object.keys(options).includes('location')) {
        this._location = options['location']
      }
      if (Object.keys(options).includes('destination')) {
        this._destination = options['destination']
      }
      if (Object.keys(options).includes('speed')) {
        this._speed = options['speed']
      }
      if (Object.keys(options).includes('path')) {
        this._path = options['path']
      }
    }
  }

  get location() {
    return this._location;
  }

  get questCompleted() {
    return this._questCompleted;
  }

  get onVehicle() {
    if (this._vehicle) {
      return true
    }
    return false
  }

  get vehicle() {
    return this._vehicle
  }

  set vehicle(vehicle) {
    this._vehicle = vehicle
  }

  get speed() {
    if (this.onVehicle) {
      return this._vehicle.speed
    }
    return this._speed
  }

  walk(the_world) {

    if (this.atDestination()) {
      if (this._path.length > 0) {
        this._destination = this._path.pop()
      } else {
        this._questCompleted = true // means they did NOT move on previous turn
      }
    } else if (this.nearDestination()) {
      this._location = this._destination
    } else {
      this.moveLocation();
    }

    if (the_world) {
      this.updateBehaviour(the_world);
    }


    return this._location
  }


  closestTo(loc, array) {
    let closest = array[0]
    array.forEach(element => {
      if (this.distance2Between(loc, element.location) < this.distance2Between(loc, closest.location)) {
        closest = element
      }
    })
    return closest
  }

  sameLoc(loc1, loc2) {
    if ((loc1[0] === loc2[0]) && (loc1[1] === loc2[1])) {
      return true
    }
    return false
  }

  get endDestination() {
    return (this._path[0] || this._destination)
  }

  updateBehaviour(the_world) {
    // with vehicle
    if (the_world.dockingStations.length > 0) {

      let closestToDestination = this.closestTo(this._destination, the_world.dockingStations)

      if (this.onVehicle) {

        // if at this docking station
        if (this.sameLoc(this._location, closestToDestination._location)) {

          this._vehicle = undefined
          closestToDestination.dock()
          this._path = []
          this._destination = this.endDestination

        } else { // if not there yet

          this._path = [this.endDestination]
          this._destination = closestToDestination._location

        }

      } else { // without vehicle

        let closestToPerson = this.closestTo(this._location, the_world.dockingStations)

        if (
          (!this.sameLoc(closestToDestination.location, closestToPerson.location))
          // two docking stations and have different locations
          &&
          ( // and distance to closest dock is less than distance to final dock
            this.distance2Between(this.location, closestToPerson.location) < this.distance2Between(this.location, closestToDestination.location)
          )) {

          if ((this.location[0] === closestToPerson.location[0]) && (this.location[1] === closestToPerson.location[1])) { // at closest dock

            this._vehicle = closestToPerson.release()
            this._path = [this.endDestination]
            this._destination = closestToDestination.location
          } else {
            this._path = [this.endDestination, closestToDestination.location]
            this._destination = closestToPerson.location
          }
        } else {
          this._path = []
          this._destination = this.endDestination
        }
      }
    }

  }

  distance2Between(loc1, loc2) {
    var x = loc1[0] - loc2[0]
    var y = loc1[1] - loc2[1]
    return ((x * x) + (y * y));
  }

  moveLocation() {
    let dx = this._destination[0] - this._location[0];
    let dy = this._destination[1] - this._location[1];
    let angle = Math.atan2(dy, dx);

    this._location[0] += this.speed * Math.cos(angle);
    this._location[1] += this.speed * Math.sin(angle);
  }

  atDestination() {
    return ((this._location[0] === this._destination[0]) && (this._location[1] === this._destination[1]))
  }

  nearDestination() {
    let x = this._destination[0] - this._location[0]
    let y = this._destination[1] - this._location[1]
    let distance_squared = ((x * x) + (y * y));
    if (distance_squared <= this.speed * this.speed) {
      return true
    }
    return false
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


}

module.exports = Person;