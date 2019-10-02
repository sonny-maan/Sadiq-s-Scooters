// const Person = require('../lib/person');

class World {
  constructor() {
    this._people = []
  }

  get people() {
    return this._people;
  }

  generatePerson(options) {
    this._people.push(new Person(options, './assets/person_scooter.png'));
  }

  tick() {

    // Remove People who have arrived
    this._people = this._people.filter((person) => {
      return !person.questCompleted
    })

    // Make each person walk
    this._people.forEach((person) => {
      person.walk();
    })

  }
}

module.exports = World;