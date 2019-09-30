class Person{
  constructor() {
    this._location = [-0.01, 0.5]
    this._destination = [1.01, 0.5]
  }

  get location(){
    return this._location;
  }

  walk(){
    this._location[0] += 0.02;
  }

  atDestination(){
    var x = this._location[0] - this._destination[0]
    var y = this._location[1] - this._destination[1]
    var distance = Math.sqrt( x*x + y*y );
    if (distance < 0.01){
      return true
    }
    console.log(this._destination)
    console.log(this._location)
    console.log(this._location[0] == this._destination[0]);
  }
}

module.exports = Person;