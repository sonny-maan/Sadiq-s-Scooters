class Person {
  constructor(options) {

    this._location = [-0.01, 0.5]
    this._destination = [1.01, 0.5]
    this._speed = 0.02
    this._questCompleted = false
    this._path = []
    this._onVehicle = false
    this._vehicle
    // this.planetEarth = options['planetEarth']

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

  onVehicle() {
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
    if (this.onVehicle()) {
      return this._vehicle.speed
    }
    return this._speed
  }

  walk(the_world) {
    if (this.atDestination()) {
      if (this._path.length > 0) {
        this._destination = this._path.pop()
        return this._location
      }
      this._questCompleted = true // means they did NOT move on previous turn
      return this._location
    } else if (this.nearDestination()) {
      this._location = this._destination
      return this._location
    }

    this.moveLocation();

    return this._location
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

}

module.exports = Person;