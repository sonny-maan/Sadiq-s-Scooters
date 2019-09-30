class Person {
  constructor() {
    this._location = [-0.01, 0.5]
    this._destination = [1.01, 0.5]
  }

  get location() {
    return this._location;
  }

  walk() {
    this._location[0] += 0.02;
  }

  atDestination() {
    var x = this._location[0] - this._destination[0]
    var y = this._location[1] - this._destination[1]
    var distance = (x * x + y * y);
    if (distance < 0.0001) {
      return true
    }
    return false
  }
}

module.exports = Person;