class World {
  constructor(options) {
    this._people = []
    this._dockingStations = []
    this.balance = 100
    this.map = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
      [1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ]
    this.graph = new Graph(this.map)
    this.setOptions(options)
  }

  get people() {
    return this._people;
  }

  generatePerson(options) {
    if (options) {
      options = {
        world: this,
        ...options
      }
    } else {
      options = {
        world: this
      }
    }

    let newPersonIndex = this._people.push(new Person(options, './assets/person_scooter.png')) - 1;
    return this._people[newPersonIndex]
  }

  get dockingStations() {
    return this._dockingStations;
  }

  generateDockingStation(options) {

    let newDockingStation = new DockingStation(options)

    if (newDockingStation.cost > this.balance) {
      return
    }
    let newDockingStationIndex = this._dockingStations.push(newDockingStation) - 1;
    this.updateBalanceDSPurchase()
    return this._dockingStations[newDockingStationIndex]
  }

  updateBalanceDSPurchase() {
    let newDockingStation = this._dockingStations[this._dockingStations.length - 1]
    this.balance = this.balance - newDockingStation.cost
  }

  payToBalance(amount) {
    this.balance = this.balance + amount
  }


  tick() {

    // Remove People who have arrived
    this._people = this._people.filter((person) => {
      return !person.questCompleted
    })

    // Make each person walk
    this._people.forEach((person) => {
      person.walk(this);
    })

  }



  setOptions(options) {
    if (options) {
      let optionKeys = Object.keys(options)
      let dockingStationKeys = Object.keys(this)

      optionKeys.forEach(optionKey => {
        if (dockingStationKeys.includes(optionKey)) {
          this[optionKey] = options[optionKey]
        }
      })
    }
  }

}