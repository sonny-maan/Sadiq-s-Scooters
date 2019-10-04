 const Scooter = require('../lib/scooter');

class DockingStation {
  constructor(options) {
    this._location = [0.5, 0.5]
    this._cost = 50
    this._capacity = 10
    this._dockedVehicles = 5
    this._pricePerRide = 5
    this._vehicleClass = Scooter
    this._increaseCapacityCost = 20
    this.setOptions(options)
  };

  get location() {
    return this._location;
  };
  get cost() {
    return this._cost;
  };

  get pricePerRide() {
    return this._pricePerRide
  }

  get capacity() {
    return this._capacity
  }

  get dockedVehicles() {
    return this._dockedVehicles
  }

  release() {
    if (this._dockedVehicles < 1) return
    this._dockedVehicles -= 1
    return new this._vehicleClass();
  };

  dock(the_world) {

    if (this._dockedVehicles >= this._capacity) {return}

    if (the_world != undefined)

    {
      the_world.payToBalance(this._pricePerRide)

    }
     this._dockedVehicles +=1
     


    return true;
  };


  setOptions(options) {
    if (options) {
      let optionKeys = Object.keys(options)
      let dockingStationKeys = Object.keys(this)

      optionKeys.forEach(optionKey => {
        if (dockingStationKeys.includes(`_${optionKey}`)) {
          this[`_${optionKey}`] = options[optionKey]
        }
      })
    }
  }

  increaseCapacity(the_world) {
    this._capacity += 2
    this._dockedVehicles +=1

    if (the_world != undefined)

    {
      the_world.payToBalance(-this._increaseCapacityCost)

    }

  }

};

module.exports = DockingStation;
