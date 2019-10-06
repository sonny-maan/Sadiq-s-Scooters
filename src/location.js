class Location {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  to(locB) {
    return new Location(locB.x - this.x, locB.y - this.y)
  }
  at(locB) {
    return (this.x === locB.x && this.y === locB.y)
  }
  near(locB, distance) {
    return (this.distance2(locB) <= (distance * distance))
  }

  length2() {
    return (this.x * this.x) + (this.y * this.y)
  }
  length() {
    return Math.sqrt(this.length2())
  }

  distance2(locB) {
    return this.to(locB).length2()
  }
  distance(locB) {
    return Math.sqrt(this.distance2(locB))
  }

}