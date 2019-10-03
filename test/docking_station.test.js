const DockingStation = require('../lib/docking_station');
const Scooter = require('../lib/scooter');

describe('docking station', () => {
  let dockingStation;

  beforeEach(() => {
    dockingStation = new DockingStation({
      vehicleClass: Scooter
    });
  });


  test('docking station default location is map center', () => {
    expect(dockingStation.location).toEqual([0.5, 0.5])
  });

  test('docking station default cost', () => {
    expect(dockingStation.cost).toEqual(50)
  });

  test('docking station default capacity', () => {
    expect(dockingStation.capacity).toEqual(10)
  });

  test('docking station releases an object with speed', () => {
    expect(dockingStation.release()).toHaveProperty('speed');
  });

  test('docking station accepts a vehicle', () => {
    // Will need to mock Player / points for this so that the player gets points once a journey is completed.
    expect(dockingStation.dock()).toEqual(true);
  });

  test('docking station default price per ride', () => {
    expect(dockingStation.pricePerRide).toEqual(5)
  });

  test('docking station capacity decreases as scooters are taken out', () => {
    dockingStation.release()
    dockingStation.release()
    expect(dockingStation.dockedVehicles).toEqual(8)
  });

  test('a docking station cannot release a scooter when its empty', () => {
    let i
    for (i=0; i <10; i++)
    {dockingStation.release()}

    expect(() => {
      dockingStation.release()
    }).toThrowError('There are no vehicles at this docking station')
    expect(dockingStation.dockedVehicles).toEqual(0)
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
