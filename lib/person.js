class Person {
  constructor(options) {

    this._location = [-0.01, 0.5]
    this._destination = [1.01, 0.5]

    this._speed = 0.02

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


    // TODO: move toward destination by speed amount.
    let dx = this._destination[0] - this._location[0];
    let dy = this._destination[1] - this._location[1];
    let angle = Math.atan2(dy, dx)

    this._location[0] += this._speed * Math.cos(angle);
    this._location[1] += this._speed * Math.sin(angle);

    // this._location[0] += this._speed;


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