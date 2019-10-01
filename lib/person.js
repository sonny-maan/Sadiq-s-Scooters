class Person {
  constructor(options) {
    console.log(options)

    this._location = [-0.01, 0.5]
    this._destination = [1.01, 0.5]
    this._distance_traveled = 0
    this._speed = 0.02

    if (options['location']) {
      this._location = options['location']
    }
  }

  get location() {
    return this._location;
  }

  walk() {

    if (this._location === this._destination) {
      return this._location
    } else if (this.atDestination()) {
      this._location = this._destination
      return this._location
    }

    this._location[0] += this._speed;
    this._distance_traveled += this._speed
    return this._location
  }

  atDestination() {
    var x = this._location[0] - this._destination[0]
    var y = this._location[1] - this._destination[1]
    var distance_squared = ((x * x) + (y * y));
    if (distance_squared <= this._speed * this._speed) {
      return true
    }
    return false
  }
}

module.exports = Person;