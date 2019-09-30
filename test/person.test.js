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
    console.log(person._destination)
    expect(person.atDestination()).toEqual(true);
  });
});