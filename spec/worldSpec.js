describe('world', () => {

  let world;

  beforeEach(() => {
    world = new World();
  });

  it('world will generate a new docking station', () => {
    expect(Object.keys(world.generateDockingStation())).toContain('location');
    expect(world.dockingStations.length).toEqual(1)
    expect(Object.keys(world.dockingStations[0])).toContain('location');
  });

  it('world will generate a new person', () => {
    expect(Object.keys(world.generatePerson())).toContain('location');
    expect(world.people.length).toEqual(1)
    expect(Object.keys(world.people[0])).toContain('location');
  });


});