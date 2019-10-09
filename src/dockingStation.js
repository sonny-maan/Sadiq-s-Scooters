class DockingStation {
  constructor(world, options) {
    this.world = world
    this.location = new Location(0.5, 0.5)
    this.cost = 50
    this.capacity = 10
    this.dockedVehicles = 5
    this.pricePerRide = 5
    this.vehicleClass = Scooter
    this.increaseCapacityCost = 20
    util.setOptions(this, options)
  }

  release() {
    if (this.dockedVehicles < 1) {
      return
    }
    this.dockedVehicles -= 1
    return new this.vehicleClass();
  }

  dock() {
    if (this.dockedVehicles >= this.capacity) {
      return
    }
    this.world.payToBalance(this.pricePerRide)
    this.dockedVehicles += 1
    return true;
  }

  increaseCapacity() {
    if (this.increaseCapacityCost > this.world.balance) {
      return
    }
    this.capacity += 2
    this.dockedVehicles += 1
    this.world.payToBalance(-this.increaseCapacityCost)
    return true
  }
}
