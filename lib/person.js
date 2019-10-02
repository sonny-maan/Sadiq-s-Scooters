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
      console.log('i am close', this._location, this._destination)
      this._location = this._destination
    } else {
      this.moveLocation();
    }

    if (the_world) {
      this.updateBehaviour(the_world);
    }


    return this._location
  }


  updateBehaviour(the_world) {
    // with vehicle

    let closestToDestinationDockingStation
    let endDestination = (this._path[0] || this._destination)

    the_world.dockingStations.forEach(dockingStation => {
      if (!closestToDestinationDockingStation) {
        closestToDestinationDockingStation = dockingStation
      }

      if (this.distance2Between(endDestination, dockingStation.location) < this.distance2Between(endDestination, closestToDestinationDockingStation.location)) {
        closestToDestinationDockingStation = dockingStation
      }
    });

    if (this.onVehicle) {
      // find ds closest to destination


      // if at this docking station
      if (this.location[0] === closestToDestinationDockingStation.location[0] && this.location[1] === closestToDestinationDockingStation.location[1]) {
        this._vehicle = undefined
        closestToDestinationDockingStation.dock()
      } else { // if not there yet
        this._path = [endDestination]
        this._destination = (closestToDestinationDockingStation.location || endDestination)
      }

    } else { // without vehicle

      // let closestToPersonDockingStation
      // the_world.dockingStations.forEach(dockingStation => {
      //   if (!closestToDestinationDockingStation) {
      //     closestToPersonDockingStation = dockingStation
      //   }

      //   if (this.distance2Between(this.location, dockingStation.location) < this.distance2Between(this.location, closestToPersonDockingStation.location)) {
      //     closestToPersonDockingStation = dockingStation
      //   }
      // });


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
    var x = this._destination[0] - this._location[0]
    var y = this._destination[1] - this._location[1]
    var distance_squared = ((x * x) + (y * y));
    if (distance_squared <= this.speed * this.speed) {
      return true
    }
    return false
  }

  draw() {
    let img = new Image();
    img.src = this.imgSrc;
    // './assets/person_scooter.png';
    img1.onload = function () {
      //draw background image

      ctx.drawImage(img, 0, 0);

    };

  }


}

module.exports = Person;