describe('another world - weird bug', () => {
  let world;
  beforeEach(() => {
    world = new World();
  })

  it('people wait by a ds if no', () => {

    for (let i = 0; i < 6; i++) {
      world.generatePerson({
        location: new Location(0.1, 0.1),
        destination: new Location(0.1, 0.9)
      })
    }
    world.generateDockingStation({
      location: new Location(0.1, 0.5)
    })
    world.generateDockingStation({
      location: new Location(0.1, 0.7)
    })


    for (let j = 0; j < 101; j++) {
      world.tick();
      if (world.people.length === 0) {
        break
      }
    }

    expect(world.people.length).toEqual(1)
    expect(world.balance).toEqual(25)
    expect(world.people.length).toEqual(8)
  })
})

describe('world', () => {

  it('a person cant pick up a scooter from an empty docking station, so they wait by it', () => {
    let world = new World()
    console.log(world)

    // make 6 people
    for (let i = 0; i < 6; i++) {

      let person = world.generatePerson({
        location: new Location(0.1, 0.1),
        destination: new Location(0.1, 0.9),
        speed: 0.02
      })

    }

    console.log(world)

    let dockingStation1 = world.generateDockingStation({
      location: new Location(0, 0.2)
    })
    let dockingStation2 = world.generateDockingStation({
      location: new Location(0, 0.8)
    })

    console.log(world)


    let j
    for (j = 0; j < 101; j++) {
      world.tick();
    }
    expect(world.people.length).toEqual(1)
    expect(world.balance).toEqual(25)

  })


  it('a person cannot dock a scooter at a full docking station, so they wait by it', () => {
    let world = new World()

    let dockingStation1 = world.generateDockingStation({
      location: new Location(0, 0.6),
      capacity: 10,
      dockedVehicles: 5
    })
    let dockingStation2 = world.generateDockingStation({
      location: new Location(0, 0.8),
      capacity: 4,
      dockedVehicles: 0
    })


    let i
    for (i = 0; i < 6; i++) {
      world.generatePerson({
        location: new Location(0, 0),
        destination: new Location(0, 1)
      });
    }
    console.log(world)
    world.tick();
    world.tick();
    console.log(world)

    let j
    for (j = 0; j < 1000; j++) {
      world.tick();
    }
    console.log(world)
    expect(world.people.length).toEqual(2) // bad
    expect(world.balance).toEqual(20) // bad

  })

  it('docking station capacity can be increased - 2 spaces at a time, one full and one empty, balance goes down', () => {
    let world = new World()

    let dockingStation1 = world.generateDockingStation({
      location: new Location(0, 0.6)
    })
    let dockingStation2 = world.generateDockingStation({
      location: new Location(0, 0.8),
      capacity: 4,
      dockedVehicles: 0
    })

    // console.log(dockingStation2.capacity + "OLD old CAPACITY")
    // console.log(dockingStation2.dockedVehicles + " old OLD DV")
    // console.log(world.balance + "old old balance ")
    let i
    for (i = 0; i < 6; i++) {
      world.generatePerson({
        location: new Location(0, 0),
        destination: new Location(0, 1),
      });
    }

    let j
    for (j = 0; j < 1000; j++) {
      world.tick();
    }
    expect(world.people.length).toEqual(2)
    expect(world.balance).toEqual(20)
    // console.log(dockingStation2.capacity + "OLD CAPACITY")
    // console.log(dockingStation2.dockedVehicles + "OLD DV")
    // console.log(world.balance + "old balance ")
    dockingStation2.increaseCapacity(world)
    // console.log(dockingStation2.capacity + "NEW CAPACITY")
    // console.log(dockingStation2.dockedVehicles + "NEW DV")
    // console.log(world.balance + "new balance ")
    expect(world.balance).toEqual(0)

    let h
    for (h = 0; h < 1000; h++) {
      world.tick();
    }
    expect(dockingStation2.capacity).toEqual(6)
    expect(dockingStation2.dockedVehicles).toEqual(6)
    expect(world.people.length).toEqual(1)
    expect(world.balance).toEqual(5)
  })

  //decrease capacity




  it('balance cannot be negative, a user cannot buy a docking station they cannot afford', () => {
    let world = new World()

    world.generateDockingStation()
    world.generateDockingStation()
    world.generateDockingStation()

    expect(world.dockingStations.length).toEqual(2)

  })
})