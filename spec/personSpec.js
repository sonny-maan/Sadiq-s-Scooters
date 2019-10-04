describe('person', () => {

  let person;

  beforeEach(() => {
    person = new Person();
  })

  it('person moves when commanded to walk', () => {
    let location = person.location.slice();
    person.walk();
    expect(person.location).not.toEqual(location);
  });

  it('returns true if person is at destination', () => {
    for (var i = 0; i < 51; i++) {
      person.walk();
    }

    expect(person.nearDestination()).toEqual(true);
  });

  it('by default person is not on a vehicle', () => {
    expect(person.vehicle).toEqual(undefined)
  })

});

describe('custom person', () => {

  it('person moves to destination if within speed', () => {
    person = new Person({
      location: [0.1, 0.1],
      destination: [0.8, 0.8],
      speed: 5
    })

    expect(person.atDestination()).toEqual(false);
    expect(person.nearDestination()).toEqual(true);

    person.walk()

    expect(person.atDestination()).toEqual(true);
    expect(person.nearDestination()).toEqual(true);

    expect(person.location).toEqual([0.8, 0.8])

  });


  it('person moves to destination at angles', () => {
    person = new Person({
      location: [0.8, 0.9],
      destination: [0.2, 0.38],
      speed: 0.02
    })

    expect(person.atDestination()).toEqual(false);

    steps = 0
    while (!person.atDestination() && steps < 1000) {
      person.walk()
      steps++
    }

    expect(person.atDestination()).toEqual(true);

    person.walk();

    expect(person.location).toEqual([0.2, 0.38])

  });

  it('person heads to destination and completes quest', () => {
    options = {
      location: [0, 0],
      destination: [0.5, 0],
      speed: 0.2,
    }
    person = new Person(options)

    person.walk() // to 0.2
    person.walk() // to 0.4
    person.walk() // to 0.5
    person.walk() // no movement, questCompleted == True
    expect(person.questCompleted).toEqual(true)

  })



  it('person follows path', () => {
    options = {
      location: [0, 0.5],
      destination: [1, 0.5],
      speed: 0.1,
      path: [
        [0, 0.5]
      ]
    }
    person = new Person(options)

    for (let i = 0; i < 5; i++) {
      person.walk();
    }

    expect(person.questCompleted).toEqual(false)

    for (let i = 0; i < 10; i++) {
      person.walk();
    }

    expect(person.questCompleted).toEqual(false)
    for (let i = 0; i < 15; i++) {
      person.walk();
      person.walk();
    }
    expect(person.questCompleted).toEqual(true)
  })



});

describe('person on scooter', () => {
  it('person on vehicle moves fast', () => {
    person_fast = new Person();
    person_fast.vehicle = new Scooter();
    person = new Person();

    person_fast.walk();
    person.walk();

    expect(person_fast.location[0]).toBeGreaterThan(person.location[0]);

  })
})