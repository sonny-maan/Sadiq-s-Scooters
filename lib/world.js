
// const Person = require('../lib/person');

const Person = require('../lib/person');
const DockingStation = require('../lib/docking_station');


class World {
  constructor() {
    this._people = []
    this._dockingStations = []
    this.balance = 100
  }

  get people() {
    return this._people;
  }

  generatePerson(options) {

    this._people.push(new Person(options, './assets/person_scooter.png'));

    // let newPersonIndex = this._people.push(new Person(options)) - 1;
    let newPersonIndex = this._people.length - 1;
    return this._people[newPersonIndex]

  }

  get dockingStations() {
    return this._dockingStations;
  }

  generateDockingStation(options) {
    let newDockingStationIndex = this._dockingStations.push(new DockingStation(options, this)) - 1;
    this.updateBalanceDSPurchase()
    return this._dockingStations[newDockingStationIndex]
  }

  updateBalanceDSPurchase() {
    let newDockingStation = this._dockingStations[this._dockingStations.length -1]
    this.balance = this.balance - newDockingStation.cost
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
