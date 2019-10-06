describe('map', () => {

  let map;

  describe('calculates width and height', () => {

    it('empty grid', () => {
      map = new Map({
        grid: []
      })
      expect(map.width).toEqual(0)
      expect(map.height).toEqual(0)
      expect(map.gridWidth).toEqual(1)
      expect(map.gridHeight).toEqual(1)

    })
    it('single row', () => {
      map = new Map({
        grid: [
          [1, 0, 1, 0, 1, 0, 1]
        ]
      })
      expect(map.width).toEqual(7)
      expect(map.height).toEqual(1)

      expect(map.gridWidth).toEqual(1.0 / 7)
      expect(map.gridHeight).toEqual(1)
    })
    it('single column', () => {
      map = new Map({
        grid: [
          [1],
          [0],
          [1],
          [0],
          [1],
          [0],
          [1]
        ]
      })
      expect(map.width).toEqual(1)
      expect(map.height).toEqual(7)

      expect(map.gridWidth).toEqual(1.0)
      expect(map.gridHeight).toEqual(1 / 7)
    })
    it('raises error if map not rectangular', () => {
      expect(() => {
        new Map({
          grid: [
            [1],
            [1, 2, 3],
            [1]
          ]
        })
      }).toThrow();
    })
  })

  describe('centerOfGrid', () => {
    let map;
    beforeEach(() => {
      map = new Map({
        grid: [
          [0, 1],
          [0, 1]
        ]
      });
    })

    it('return center of grid', () => {
      expect(map.centerOfGrid({
        x: 0,
        y: 0
      }).near({
        x: 0.25,
        y: 0.25
      }, 0.01)).toEqual(true)
    })
    it('undefined if outside of range', () => {
      expect(map.centerOfGrid({
        x: -1,
        y: 0
      })).toEqual(undefined)
    })

  })

  describe('gridLocFromLoc', () => {
    let map;
    beforeEach(() => {
      map = new Map({
        grid: [
          [0, 1],
          [0, 1]
        ]
      });
    })
    it('gives grid loc', () => {
      let gridLoc = map.gridLocFromLoc({
        x: 0.25,
        y: 0.25
      });
      console.log(gridLoc)
      expect(gridLoc.x).toEqual(0);
      expect(gridLoc.y).toEqual(0);
    })
    it('gives grid loc edge - 1', () => {
      let gridLoc = map.gridLocFromLoc({
        x: 0,
        y: 0
      });
      console.log(gridLoc)
      expect(gridLoc.x).toEqual(0);
      expect(gridLoc.y).toEqual(0);
    })
    it('gives grid loc edge - 2', () => {
      let gridLoc = map.gridLocFromLoc({
        x: 0,
        y: 1
      });
      console.log(gridLoc)
      expect(gridLoc.x).toEqual(0);
      expect(gridLoc.y).toEqual(1);
    })
    it('gives grid loc edge - 3', () => {
      let gridLoc = map.gridLocFromLoc({
        x: 1,
        y: 0
      });
      console.log(gridLoc)
      expect(gridLoc.x).toEqual(1);
      expect(gridLoc.y).toEqual(0);
    })
    it('gives grid loc edge - 4', () => {
      let gridLoc = map.gridLocFromLoc({
        x: 1,
        y: 1
      });
      console.log(gridLoc)
      expect(gridLoc.x).toEqual(1);
      expect(gridLoc.y).toEqual(1);
    })
  })

})