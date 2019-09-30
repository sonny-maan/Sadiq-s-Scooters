const Person = require('../lib/person');
class World{
  constructor(){
    this._people = []
  }

  get people(){
    return this._people;
  }

  generatePerson(){
    this._people.push(new Person());
  }

  tick(){
    this._people.forEach((person) => {
      person.walk();
    })
  }
}

module.exports = World;
