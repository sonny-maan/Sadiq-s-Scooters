describe('world', () => {

  let world;

  beforeEach(() => {
    world = new World();
  });

  it('world to generate person who moves towards destination', () => {
    world.generatePerson();
    expect(world.people.length).toEqual(1);
    let originalLocation = world.people[0].location
    world.tick()
    expect(world.people[0].location.at(originalLocation)).toEqual(false);
    for (var i = 0; i < 110; i++) {
      world.tick();
    }
    expect(world.people.length).toEqual(0);
  });

  it('person arrives at destination before disappearing', () => {
    world.generatePerson({
      location: new Location(0, 0),
      destination: new Location(0.5, 0),
      speed: 0.2,
    });
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


  it('person on vehicle goes to docking station closest to destination and walks', () => {

    let personA = world.generatePerson({
      location: new Location(0, 0),
      destination: new Location(0, 1),
      speed: 0.002
    })
    world.people[0].vehicle = new Scooter({
      speed: 0.1
    })
    let dockingStationLoc = new Location(1, 0)
    let dockingStation = world.generateDockingStation({
      location: dockingStationLoc
    })

    expect(world.dockingStations[0].location.at(dockingStationLoc)).toEqual(true)

    let scootCounter = 0
    while (!personA.location.at(dockingStation.location) && scootCounter < 2000) {
      world.tick();
      scootCounter++
    }
    expect(scootCounter).toBeLessThan(13)
    expect(world.dockingStations[0].location.at(dockingStationLoc)).toEqual(true)

    let walkCounter = 0
    while (!personA.location.at(new Location(0, 1)) && walkCounter < 2000) {
      world.tick();
      walkCounter++
    }
    expect(walkCounter).toBeGreaterThan(12)
    expect(world.dockingStations[0].location.at(dockingStationLoc)).toEqual(true)
  });


  xit('person will use a scooter when it goes past a docking station, and will put it back at the end', () => {
    let dockingStation1 = world.generateDockingStation({
      location: new Location(0, 0.6)
    })
    let dockingStation2 = world.generateDockingStation({
      location: new Location(0, 0.8)
    })

    expect(world.dockingStations.length).toEqual(2);

    let person = world.generatePerson({
      location: new Location(0, 0),
      destination: new Location(0, 1)
    });



    let stepCounter = 0
    while (!person.location.at(dockingStation1.location) && stepCounter < 2000) {
      world.tick();
      stepCounter++
    }

    world.tick();
    world.tick();
    expect(person.onVehicle).toEqual(true)

    let scootCounter = 0
    while (!person.location.at(dockingStation2.location) && scootCounter < 2000) {
      world.tick();
      scootCounter++
    }
    world.tick();
    world.tick();

    expect(scootCounter).toBeLessThan(8)
    expect(person.onVehicle).toEqual(false)
  });

  it('the balance of the world goes down by docking station cost when a docking station is purchased', () => {

    expect(world.balance).toEqual(100)
    world.generateDockingStation()
    expect(world.balance).toEqual(50)
  })


  it('the balance of the world goes down by docking station cost when a docking station is purchased', () => {
    expect(world.balance).toEqual(100)
    let dockingStation = world.generateDockingStation()
    dockingStation.dock(world)
    expect(world.balance).toEqual(55)
  })

});