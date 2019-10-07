describe('location', () => {
  let location


  describe('loc1.to(loc2)', () => {
    it('provides a location of the direction', () => {
      let loc1 = new Location(1, 2)
      let loc2 = new Location(5, 3)
      let aToB = loc1.to(loc2)
      expect(aToB.x).toEqual(4)
      expect(aToB.y).toEqual(1)
    })
  })

  describe('loc1.at(loc2)', () => {
    it('returns true when same location', () => {
      let loc1 = new Location(1, 2)
      let loc2 = new Location(1.0, 2.0)
      expect(loc1.at(loc2)).toEqual(true)
      expect(loc2.at(loc1)).toEqual(true)
    })
    it('returns false when different locations', () => {
      let loc1 = new Location(1, 2)
      let loc2 = new Location(1.4, 2)
      expect(loc1.at(loc2)).toEqual(false)
      expect(loc2.at(loc1)).toEqual(false)
    })
  })

  describe('loc1.near(loc2,distance)', () => {

    it('returns true when near (same loc)', () => {
      let loc1 = new Location(1, 2)
      let loc2 = new Location(1, 2)
      let distance = 1
      expect(loc1.near(loc2, distance)).toEqual(true)
      expect(loc2.near(loc1, distance)).toEqual(true)
    })
    it('returns true when within distance', () => {
      let loc1 = new Location(1, 2)
      let loc2 = new Location(1.5, 2.5)
      let distance = 1
      expect(loc1.near(loc2, distance)).toEqual(true)
      expect(loc2.near(loc1, distance)).toEqual(true)
    })
    it('returns true when within distance, sub1 ', () => {
      let loc1 = new Location(0.1, 0.2)
      let loc2 = new Location(0.15, 0.25)
      let distance = 0.1
      expect(loc1.near(loc2, distance)).toEqual(true)
      expect(loc2.near(loc1, distance)).toEqual(true)
    })

    it('returns true when at distance', () => {
      let loc1 = new Location(1, 2)
      let loc2 = new Location(2, 2)
      let distance = 1
      expect(loc1.near(loc2, distance)).toEqual(true)
      expect(loc2.near(loc1, distance)).toEqual(true)
    })

  })

  describe('loc1.moveToward(loc2,distance)', () => {
    it('returns new location', () => {
      let loc1 = new Location(1, 1)
      let loc2 = new Location(1, -8)
      let distance = 3
      let newLoc = loc1.moveToward(loc2, distance)
      expect(newLoc.near(new Location(1, -2), 0.002)).toEqual(true)
      // expect(newLoc.x).toEqual(1)
      // expect(newLoc.y).toEqual(-2)
    })

  })

  describe('loc1.onMap() and offMap', () => {
    it('handles edges -1 ', () => {
      let loc = new Location(0, 0)
      expect(loc.onMap()).toEqual(true)
      expect(loc.offMap()).toEqual(false)
    });
    it('handles edges -2 ', () => {
      let loc = new Location(1, 0)
      expect(loc.onMap()).toEqual(true)
    });
    it('handles edges -3 ', () => {
      let loc = new Location(0, 1)
      expect(loc.onMap()).toEqual(true)
    });
    it('handles edges -4 ', () => {
      let loc = new Location(1, 1)
      expect(loc.onMap()).toEqual(true)
    });
    it('random is on map', () => {
      let loc = new Location(Math.random(), Math.random())
      expect(loc.onMap()).toEqual(true)
    })
    it('random off map', () => {
      let loc = new Location(Math.random() + 1, Math.random() - 1)
      expect(loc.onMap()).toEqual(false)
      expect(loc.offMap()).toEqual(true)
    })
  })

  describe('loc.moveToOnMap()', () => {
    it('moves in x', () => {
      let loc = new Location(-0.5, 0.5)
      loc = loc.moveToOnMap()
      expect(loc.x).toEqual(0, 0.5)
    })
    it('moves in y', () => {
      let loc = new Location(0.5, -0.5)
      loc = loc.moveToOnMap()
      expect(loc.x).toEqual(0.5, -0.5)
    })
  })

})