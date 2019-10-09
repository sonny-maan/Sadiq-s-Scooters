describe('PersonBehaviour', () => {
  let worldMap
  let world
  let person
  let personBehaviour

  beforeEach(() => {
    worldMap = new WorldMap([
      [0]
    ])
    world = new World({
      map: worldMap
    })
    person = new Person({
      location: new Location(0.005, 0.005),
      destination: new Location(0.995, 0.995),
      speed: 0.002
    })
    personBehaviour = new PersonBehaviour(world, person)
  })


  xit('returns final destination if no world', () => {
    let personBehaviour = new PersonBehaviour(undefined, person)
    let instructions = personBehaviour.instructions()
    expect(instructions).toEqual({
      directions: [person.destination],
      actions: [null],
      objects: [null]
    })
  })

  xit('returns final destination in the same grid', () => {
    let instructions = personBehaviour.instructions()
    expect(instructions).toEqual({
      directions: [person.destination],
      actions: [null],
      objects: [null]
    })
  })





})