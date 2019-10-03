const World = require('../lib/world');
const Scooter = require('../lib/scooter');


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


  test('person on vehicle goes to docking station closest to destination and walks', () => {
    world = new World();

    personOptions = {
      location: [0, 0.5],
      path: [0, 1],
      destination: [0, 1],
    }
    let person = world.generatePerson(personOptions)
    person.vehicle = new Scooter

    dockingStationOptions = {
      location: [0.01, 0.7]
    }
    let dockingStation = world.generateDockingStation(dockingStationOptions)
    let scootCounter = 0
    expect(world.dockingStations[0].location).toEqual([0.01, 0.7])

    while (scootCounter < 2000) {
      world.tick();
      scootCounter++
      if ((person.location[0] == dockingStation.location[0]) && (person.location[1] == dockingStation.location[1])) {
        break;
      }
    }
    expect(scootCounter).toBeLessThan(8)
    expect(world.dockingStations[0].location).toEqual([0.01, 0.7])

    let walkCounter = 0
    while (walkCounter < 2000) {
      world.tick();
      walkCounter++
      // console.log(walkCounter)

      // expect(world.dockingStations[0].location).toEqual([0.01, 0.7])

      if ((person.location[0] === 0) && (person.location[1] === 1)) {
        break;
      }
    }
    expect(walkCounter).toBeGreaterThan(10)
    expect(world.dockingStations[0].location).toEqual([0.01, 0.7])


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

    world.tick();
    console.log(person);
    world.tick();
    console.log(person);

    let stepCounter = 0

    while (stepCounter < 2000) {
      world.tick();
      stepCounter++
      if ((person.location[0] == dockingStation1.location[0]) && (person.location[1] == dockingStation1.location[1])) {
        console.log(person);
        break;
      }
    }
    world.tick();
    console.log(person);
    world.tick();
    console.log(person);
    expect(person.onVehicle).toEqual(true)

    let scootCounter = 0
    while (scootCounter < 2000) {
      world.tick();
      scootCounter++
      if ((person.location[0] == dockingStation2.location[0]) && (person.location[1] == dockingStation2.location[1])) {
        break;
      }
    }

    expect(scootCounter).toBeLessThan(8)

    expect(person.onVehicle).toEqual(false)


  });

  test('the balance of the world goes down by docking station cost when a docking station is purchased', () => {

    expect(world.balance).toEqual(100)
    world.generateDockingStation()
    expect(world.balance).toEqual(50)
  })


  test('the balance of the world goes down by docking station cost when a docking station is purchased', () => {
    expect(world.balance).toEqual(100)
    let dockingStation = world.generateDockingStation()
    dockingStation.dock(world)
    expect(world.balance).toEqual(55)
  })

  test('balance cannot be negative, a user cannot buy a docking station they cannot afford', () => {
    world.generateDockingStation()
    world.generateDockingStation()
    expect(() => {
      world.generateDockingStation()
    }).toThrow('You do not have enough money to buy that docking station')
    expect(world._dockingStations.length).toEqual(2)

  })

});
