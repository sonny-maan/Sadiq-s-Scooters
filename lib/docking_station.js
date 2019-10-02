class DockingStation {
  constructor(options) {
    this._location = [0.5, 0.5]
    this._cost = 50

    this.setOptions(options)
  };

  get location() {
    return this._location;
  };
  get cost() {
    return this._cost;
  };

  release() {
    return 'Scooter';
  };

  dock() {
    return true;
  };


  setOptions(options) {
    if (options) {
      let optionKeys = Object.keys(options)
      let dockingStationKeys = Object.keys(this)
      optionKeys.forEach(optionKey => {
        if (dockingStationKeys.includes(`_${optionKey}`)) {
          this[`_${optionKey}`] = options[optionKey];
        }
      });
    };
  };

};

module.exports = DockingStation;