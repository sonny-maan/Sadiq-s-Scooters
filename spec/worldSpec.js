describe('world', () => {

  let world;

  beforeEach(() => {
    world = new World({
      map: undefined
    });
  });

  it('world will generate a new docking station', () => {
    expect(Object.keys(world.generateDockingStation())).toContain('_location');
    expect(world.dockingStations.length).toEqual(1)
    expect(Object.keys(world.dockingStations[0])).toContain('_location');
  });

  it('world will generate a new person', () => {
    expect(Object.keys(world.generatePerson())).toContain('location');
    console.log(world.people)
    expect(world.people.length).toEqual(1)
    expect(Object.keys(world.people[0])).toContain('location');
  });


});