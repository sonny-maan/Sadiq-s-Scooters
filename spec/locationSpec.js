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


})