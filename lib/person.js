class Person {
  constructor() {
    this._location = [-0.01, 0.5]
    this._destination = [1.01, 0.5]
  }

  get location() {
    return this._location;
  }

  walk() {
    console.log(this._location)
    this._location[0] += 0.02;
    console.log(this._location)
  }

  atDestination() {
    var x = this._location[0] - this._destination[0]
    var y = this._location[1] - this._destination[1]
    var distance = ((x * x) + (y * y));
    console.log(x, y, distance)
    if (distance < 0.0002) {
      return true
    }
    return false
  }
}

module.exports = Person;