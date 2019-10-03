describe('docking station', () => {
  let dockingStation;

  beforeEach(() => {
    dockingStation = new DockingStation({
      vehicleClass: Scooter
    });
  });


  it('docking station default location is map center', () => {
    expect(dockingStation.location).toEqual([0.5, 0.5])
  });

  it('docking station default cost', () => {
    expect(dockingStation.cost).toEqual(50)
  });

  it('docking station releases an object with speed', () => {
    expect(Object.keys(dockingStation.release())).toContain('_speed')
  });

  it('docking station accepts a vehicle', () => {
    // Will need to mock Player / points for this so that the player gets points once a journey is completed.
    expect(dockingStation.dock()).toEqual(true);
  });

  it('docking station default price per ride', () => {
    expect(dockingStation.pricePerRide).toEqual(5)
  });


});

describe('unique docking station', () => {
  it('docking station accepts a unique location', () => {
    dockingStation = new DockingStation({
      location: [0, 0]
    })
    expect(dockingStation.location).toEqual([0, 0])
  });
  it('docking station accepts a unique cost', () => {
    dockingStation = new DockingStation({
      cost: 25
    })
    expect(dockingStation.cost).toEqual(25)
  });
});