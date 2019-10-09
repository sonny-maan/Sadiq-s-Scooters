class PersonBehaviour {
  constructor(world, person) {
    this.person = person
    this.world = world
    this.worldMap = this.world.map
  }

  instructions() {
    let loc = this.person.location
    console.log(this.person)
    let destination = this.person.endDestination()

    if (this.world === undefined) {
      return {
        directions: [destination],
        actions: [null],
        objects: [null]
      }
    }
  }
}