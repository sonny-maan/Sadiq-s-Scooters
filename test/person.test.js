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
    console.log(person)
    for (var i = 0; i < 51; i++) {
      person.walk();
    }
    expect(person.atDestination()).toEqual(true);
  });

});

describe('custom person', () => {

  test('person moves to destination if within speed', () => {
    person = new Person({
      location: [0.1, 0.1],
      destination: [0.8, 0.8],
      speed: 1
    })
    expect(person.atDestination()).toEqual(true);
    person.walk()
    expect(person.atDestination()).toEqual(true);
    expect(person.location).toEqual([0.8, 0.8])

  });


  test('person moves to destination at angles', () => {
    person = new Person({
      location: [0.8, 0.9],
      destination: [0.2, 0.38],
      speed: 0.02
    })
    expect(person.atDestination()).toEqual(false);
    steps = 0
    while (!person.atDestination() && steps < 1000) {
      steps++
      person.walk()
    }

    expect(person.atDestination()).toEqual(true);
    person.walk();
    expect(person.location).toEqual([0.2, 0.38])

  });


});