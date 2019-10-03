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
      // console.log('SNAPPING')
      this._location = this._destination
    } else {
      // this.moveLocation()
      this._location = this.newLocation()
    }

    if (the_world) {
      this.updateBehaviour(the_world);
    }
    return this._location
  }

  newLocation() {
    let direction = this.aToB(this._location, this._destination)
    let angle = Math.atan2(direction[1], direction[0]);
    let newX = (this._location[0] + (this.speed * Math.cos(angle)));
    let newY = (this._location[1] + (this.speed * Math.sin(angle)));
    return [newX, newY]
  }

  moveLocation() {
    let dx = this._destination[0] - this._location[0];
    let dy = this._destination[1] - this._location[1];
    let angle = Math.atan2(dy, dx);
    let a = (this._location[0] + (this.speed * Math.cos(angle)));
    let b = (this._location[1] + (this.speed * Math.sin(angle)));
    this._location[0] = a
    this._location[1] = b
    return this._location
  }


  aToB(locA, locB) {
    return [locB[0] - locA[0], locB[1] - locA[1]]
  }
  mag2(loc) {
    return (loc[0] * loc[0]) + (loc[1] * loc[1])
  }
  mag(loc) {
    Math.sqrt(this.mag2(loc))
  }
  dist2(loc1, loc2) {
    return this.mag2(this.aToB(loc2, loc1))
  }
  dist(loc1, loc2) {
    return Math.sqrt(this.dist2(loc1, loc2))
  }

  sameLoc(loc1, loc2) {
    if ((loc1[0] === loc2[0]) && (loc1[1] === loc2[1])) {
      return true
    }
    return false
  }

  closestTo(loc, array) {
    let closest = array[0]
    let currentDist2 = this.dist2(loc, closest._location)
    array.forEach(element => {
      let newDist2 = this.dist2(loc, element._location)
      if (newDist2 < currentDist2) {
        closest = element
        currentDist2 = newDist2
      }
    })
    return closest
  }

  get endDestination() {
    return (this._path[0] || this._destination)
  }

  updateBehaviour(the_world) {
    if (the_world.dockingStations.length > 0) {

      let closestToDestination = this.closestTo(this._destination, the_world.dockingStations)

      if (this.onVehicle) {

        // if at this docking station
        if (this.sameLoc(this._location, closestToDestination._location)) {
          this._destination = this.endDestination
          this._path = []
          closestToDestination.dock(the_world)
          this._vehicle = undefined

        } else { // if not there yet

          this._path = [this.endDestination]
          this._destination = closestToDestination._location

        }

      } else {
        // without vehicle
        let closestToPerson = this.closestTo(this._location, the_world.dockingStations)

        // only matters if closest to person and closest to destination is different
        if (this.sameLoc(closestToDestination._location, closestToPerson._location) === false) {
          // if there:
          if (this.sameLoc(this._location, closestToPerson._location)) {

            this._path = [this.endDestination]
            this._destination = closestToDestination._location
            this._vehicle = closestToPerson.release();

          } else { // go to closest
            this._path = [this.endDestination, closestToDestination._location]
            this._destination = closestToPerson._location
          }
        }
      }
    }
  }


  atDestination() {
    return this.sameLoc(this._location, this._destination);
  }

  nearDestination() {

    let x = (this._destination[0] - this._location[0]);
    let y = (this._destination[1] - this._location[1]);
    let distance_squared = ((x * x) + (y * y));

    if (distance_squared <= (this.speed * this.speed)) {
      return true;
    }
    return false;
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