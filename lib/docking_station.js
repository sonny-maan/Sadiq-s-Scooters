const Scooter = require('../lib/scooter');

class DockingStation {
  constructor(options) {
    this._location = [0.5, 0.5]
    this._cost = 50
    this._capacity = 10
    this._dockedVehicles = 10
    this._pricePerRide = 5
    this._vehicleClass = Scooter
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
    if (this._dockedVehicles < 1) throw new Error('There are no vehicles at this docking station')
    this._dockedVehicles -= 1
    return new this._vehicleClass();
  };

  dock(the_world) {

    if (the_world != undefined)

    {
      the_world.payToBalance(this._pricePerRide)
    }
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

};

module.exports = DockingStation;
