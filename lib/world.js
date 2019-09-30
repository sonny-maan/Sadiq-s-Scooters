const Person = require('../lib/person');
class World {
  constructor() {
    this._people = []
  }

  get people() {
    return this._people;
  }

  generatePerson() {
    this._people.push(new Person());
  }

  tick() {
    // Make each person walk
    this._people.forEach((person) => {
      person.walk();
    })

    // Remove People who have arrived
    this._people = this._people.filter((person) => {
      !person.atDestination()

    })

  }
}

module.exports = World;