const World = require('../lib/world');


describe('world', () => {

  let world;

  beforeEach(() => {
    world = new World();
  })

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
  })

  test('person arrives at destination before disappearing', () => {
    options = {
      location: [0, 0],
      destination: [0.5, 0],
      speed: 0.2,
    }
    world.generatePerson(options);
    console.log('starting arriving test')
    console.log(world.people)
    world.tick();
    expect(world.people.length).toEqual(1); // at 0.2

    console.log(world.people)



    world.tick();
    expect(world.people.length).toEqual(1); // at 0.4


    console.log(world.people)


    world.tick();
    expect(world.people.length).toEqual(1); // at 0.5


    console.log(world.people)


    world.tick();
    expect(world.people.length).toEqual(1); // still at 0.5?



    console.log(world.people)

    world.tick();
    expect(world.people.length).toEqual(0); // still at 0.5?



  });

})