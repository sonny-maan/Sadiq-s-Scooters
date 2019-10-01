const Person = require('../lib/person');

describe('person', () => {

  let person;

  beforeEach(() => {
    person = new Person();
  })

  test('person moves when commanded to walk', () => {
    let location = person.location.slice();
    person.walk();
    expect(person.location).not.toEqual(location);
  });

  test('returns true if person is at destination', () => {
    for (var i = 0; i < 51; i++) {
      person.walk();
    }
    expect(person.atDestination()).toEqual(true);
  });

});

describe('custom person', () => {

  test('person moves to destination if within speed', () => {
    person = new Person({
      location: [0.05, 0.1],
      destination: [0.05, 0.8],
      speed: 1
    })
    expect(person.atDestination()).toEqual(true);
    person.walk()
    expect(person.atDestination()).toEqual(true);
    expect(person.location).toEqual([0.05, 0.8])

  });
});