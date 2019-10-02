const World = require('../lib/world');


describe('world', () => {

  let world;

  beforeEach(() => {
    world = new World();
  });

  test('world to generate person who moves towards destination', () => {
    world.generatePerson();
    expect(world.people.length).toEqual(1);
    let originalLocation = world.people[0].location
    world.tick()
    expect(world.people.location).not.toEqual(originalLocation);
    for (var i = 0; i < 110; i++) {
      world.tick();
    }
    expect(world.people.length).toEqual(0);
  });

  test('person arrives at destination before disappearing', () => {
    options = {
      location: [0, 0],
      destination: [0.5, 0],
      speed: 0.2,
    }
    world.generatePerson(options);

    world.tick();
    expect(world.people.length).toEqual(1); // at 0.2

    world.tick();
    expect(world.people.length).toEqual(1); // at 0.4

    world.tick();
    expect(world.people.length).toEqual(1); // at 0.5

    world.tick();
    expect(world.people.length).toEqual(1); // still at 0.5?

    world.tick();
    expect(world.people.length).toEqual(0); // still at 0.5?
  });

  test('person will use a scooter when it goes past a docking station, and will put it back at the end', () => {
    let dockingStation1 = world.generateDockingStation({
      location: [0, 0.6]
    })
    let dockingStation2 = world.generateDockingStation({
      location: [0, 0.8]
    })
    expect(world.dockingStations.length).toEqual(2);

    let person = world.generatePerson({
      location: [0, 0],
      destination: [0, 1]
    });
    let stepCounter = 0

    while ((person.location != dockingStation1.location) && (stepCounter < 2000)) {
      world.tick();
      stepCounter++
    }

    expect(person.onVehicle()).toEqual(true)
    while ((person.location != dockingStation2.location) && (scootCounter < 2000)) {
      world.tick();
      scootCounter++
    }

    expect(scootCounter).toBeLessThan(8)

    expect(person.vehicle).toEqual(false)

  });




});