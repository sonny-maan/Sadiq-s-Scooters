class World {
  constructor(options) {
    this.people = []
    this.dockingStations = []
    this.balance = 250
    this.hasUpdated = true
    // this.map = new WorldMap(maps.map1.grid)
    this.map = new WorldMap(maps.map0.grid) // default of one massive walkable grid
    util.setOptions(this, options)
    this.personGenerator = new PersonGenerator(this)
    this.tickCounter = 0
  }

  generatePerson(options) {
    let newPersonIndex = this.people.push(new Person(this, options)) - 1;
    return this.people[newPersonIndex]
  }

  generateDockingStation(options, preventSameGrid = false, enforcePathAdjacent = false, snapToCentre = false) {

    let newDs = new DockingStation(this, options)
    let newDsGridLoc = this.map.gridLocFromLoc(newDs.location)
    if (snapToCentre) {
      newDs.location = this.map.centerOfGrid(newDsGridLoc)
    }

    // Check all docking stations and if they're in the same grid as the new one
    let clash = false
    if (preventSameGrid) {
      this.dockingStations.forEach((ds) => {
        let dsLoc = this.map.gridLocFromLoc(ds.location)
        if (newDsGridLoc.x === dsLoc.x && newDsGridLoc.y === dsLoc.y) {
          clash = true
        }
      })
    }
    if (clash) {
      return undefined
    }

    if (enforcePathAdjacent) {
      if (this.map.isWalkable(newDsGridLoc)) {
        clash = true
      }
      if (!this.map.isPathAdjacent(newDsGridLoc)) {
        clash = true
      }
    }
    if (clash) {
      return undefined
    }

    // Prevent balance from going negative
    if (newDs.cost > this.balance) {
      return undefined
    }

    // add docking station to the world
    this.dockingStations.push(newDs);
    // Reduce balance by cost
    this.balance -= newDs.cost
    // set grid to walkable
    this.map.makeWalkable(newDsGridLoc)

    return newDs
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
