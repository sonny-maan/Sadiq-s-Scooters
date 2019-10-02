const World = require('../lib/world');

describe('world', () => {

  let world;

  beforeEach(() => {
    world = new World;
  });

  test('world will generate a new docking station', () => {
    expect(world.generateDockingStation()).toHaveProperty('location');
    expect(world.dockingStations.length).toEqual(1)
    expect(world.dockingStations[0]).toHaveProperty('location');
  });

  test('world will generate a new person', () => {
    expect(world.generatePerson()).toHaveProperty('location');
    console.log(world.people)
    expect(world.people.length).toEqual(1)
    expect(world.people[0]).toHaveProperty('location');
  });


});
