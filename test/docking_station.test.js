const DockingStation = require('../lib/docking_station');

describe('docking station', () => {
  let dockingStation;

  beforeEach(() => {
    dockingStation = new DockingStation();
  });


  test('docking station default location is map center', () => {
    expect(dockingStation.location).toEqual([0.5, 0.5])
  });

  test('docking station default cost', () => {
    expect(dockingStation.cost).toEqual(50)
  });

  test('docking station releases a scooter', () => {
    expect(dockingStation.release()).toEqual('Scooter');
  });

  test('docking station accepts a vehicle', () => {
    // Will need to mock Player / points for this so that the player gets points once a journey is completed.
    expect(dockingStation.dock()).toEqual(true);
  });

});

describe('unique docking station', () => {
  test('docking station accepts a unique location', () => {
    dockingStation = new DockingStation({
      location: [0, 0]
    })
    expect(dockingStation.location).toEqual([0, 0])
  });
  test('docking station accepts a unique cost', () => {
    dockingStation = new DockingStation({
      cost: 25
    })
    expect(dockingStation.cost).toEqual(25)
  });
});