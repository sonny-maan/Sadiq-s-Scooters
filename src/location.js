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

  moveToward(locB, distance) {
    let direction = this.to(locB)
    let angle = Math.atan2(direction.y, direction.x);
    let newX = (this.x + (distance * Math.cos(angle)));
    let newY = (this.y + (distance * Math.sin(angle)));
    return new Location(newX, newY)
  }

  onMap() {
    return (this.x >= 0 && this.x <= 1 && this.y >= 0 && this.y <= 1)
  }
  offMap() {
    return !this.onMap()
  }

  moveToOnMap() {
    let newX = this.x
    let newY = this.y
    if (this.x < 0) {
      newX = 0
    }
    if (this.x > 1) {
      newX = 1
    }
    if (this.y < 0) {
      newY = 0
    }
    if (this.y > 1) {
      newY = 1
    }
    return new Location(newX, newY)
  }

}