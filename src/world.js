class World {
  constructor(options) {
    this.people = []
    this.dockingStations = []
    this.balance = 100
    this.hasUpdated = true
    // this.map = new WorldMap(maps.map1.grid)
    this.map = new WorldMap(maps.map0.grid)
    util.setOptions(this, options)
    this.personGenerator = new PersonGenerator(this)
    this.tickCounter = 0
  }

  generatePerson(options) {
    let newPersonIndex = this.people.push(new Person(this, options)) - 1;
    return this.people[newPersonIndex]
  }

  generateDockingStation(options) {

    let newDockingStation = new DockingStation(this, options)
    if (newDockingStation.cost > this.balance) {
      return undefined
    } else {
      let newDockingStationIndex = this.dockingStations.push(newDockingStation) - 1;
      this.balance -= newDockingStation.cost
      // this.updateBalanceDSPurchase(newDockingStation)
      return this.dockingStations[newDockingStationIndex]
    }
  }

  updateBalanceDSPurchase(newDockingStation) {
    this.balance = this.balance - newDockingStation.cost
  }

  payToBalance(amount) {
    this.balance = this.balance + amount
  }


  tick() {
    // Remove People who have arrived
    this.people = this.people.filter((person) => {
      return !person.questCompleted
    })
    // Make each person walk
    this.people.forEach((person) => {
      person.walk(this);
    })
    this.hasUpdated = false
    this.tickCounter++
  }
}