
// const Person = require('../lib/person');

const Person = require('../lib/person');
const DockingStation = require('../lib/docking_station');


class World {
  constructor() {
    this._people = []
    this._dockingStations = []
  }

  get people() {
    return this._people;
  }

  generatePerson(options) {

    this._people.push(new Person(options, './assets/person_scooter.png'));

    let newPersonIndex = this._people.push(new Person(options)) - 1;
    return this._people[newPersonIndex]

  }

  get dockingStations() {
    return this._dockingStations;
  }

  generateDockingStation(options) {
    let newDockingStationIndex = this._dockingStations.push(new DockingStation(options)) - 1;
    return this._dockingStations[newDockingStationIndex]
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