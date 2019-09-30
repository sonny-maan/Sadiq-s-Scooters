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
  for (var i = 0; i < 101; i++) {
    world.tick();
   }
   expect(world.people.length).toEqual(0);
})

})
