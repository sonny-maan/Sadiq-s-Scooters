describe('WorldMap', () => {

  let worldMap;

  describe('calculates width and height', () => {

    it('empty grid', () => {
      worldMap = new WorldMap([])
      expect(worldMap.width).toEqual(1)
      expect(worldMap.height).toEqual(1)
      expect(worldMap.gridWidth).toEqual(1)
      expect(worldMap.gridHeight).toEqual(1)

    })
    it('single row', () => {
      worldMap = new WorldMap([
        [1, 0, 1, 0, 1, 0, 1]
      ])
      expect(worldMap.width).toEqual(7)
      expect(worldMap.height).toEqual(1)

      expect(worldMap.gridWidth).toEqual(1.0 / 7)
      expect(worldMap.gridHeight).toEqual(1)
    })
    it('single column', () => {
      worldMap = new WorldMap([
        [1],
        [0],
        [1],
        [0],
        [1],
        [0],
        [1]
      ])
      expect(worldMap.width).toEqual(1)
      expect(worldMap.height).toEqual(7)

      expect(worldMap.gridWidth).toEqual(1.0)
      expect(worldMap.gridHeight).toEqual(1 / 7)
    })
    it('raises error if worldMap not rectangular', () => {
      expect(() => {
        new WorldMap({
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
    let worldMap;
    beforeEach(() => {
      worldMap = new WorldMap([
        [0, 1],
        [0, 1]
      ]);
    })

    it('return center of grid', () => {
      expect(worldMap.centerOfGrid({
        x: 0,
        y: 0
      }).near({
        x: 0.25,
        y: 0.25
      }, 0.01)).toEqual(true)
    })
    it('undefined if outside of range', () => {
      expect(worldMap.centerOfGrid({
        x: -1,
        y: 0
      })).toEqual(undefined)
    })

  })

  describe('gridLocFromLoc', () => {
    let worldMap;
    beforeEach(() => {
      worldMap = new WorldMap([
        [0, 1],
        [0, 1]
      ]);
    })
    it('gives grid loc', () => {
      let gridLoc = worldMap.gridLocFromLoc({
        x: 0.25,
        y: 0.25
      });
      expect(gridLoc.x).toEqual(0);
      expect(gridLoc.y).toEqual(0);
    })
    it('gives grid loc edge - 1', () => {
      let gridLoc = worldMap.gridLocFromLoc({
        x: 0,
        y: 0
      });
      expect(gridLoc.x).toEqual(0);
      expect(gridLoc.y).toEqual(0);
    })
    it('gives grid loc edge - 2', () => {
      let gridLoc = worldMap.gridLocFromLoc({
        x: 0,
        y: 1
      });
      expect(gridLoc.x).toEqual(0);
      expect(gridLoc.y).toEqual(1);
    })
    it('gives grid loc edge - 3', () => {
      let gridLoc = worldMap.gridLocFromLoc({
        x: 1,
        y: 0
      });
      expect(gridLoc.x).toEqual(1);
      expect(gridLoc.y).toEqual(0);
    })
    it('gives grid loc edge - 4', () => {
      let gridLoc = worldMap.gridLocFromLoc({
        x: 1,
        y: 1
      });
      expect(gridLoc.x).toEqual(1);
      expect(gridLoc.y).toEqual(1);
    })
  })

  describe('pathBetween(gridLocA,gridLocB)', () => {
    let map;
    beforeEach(() => {
      let grid = [
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 0]
      ]
      map = new WorldMap(grid)
    })
    it('finds the route', () => {
      let gridLocA = {
        x: 0,
        y: 9
      }
      let gridLocB = {
        x: 9,
        y: 0
      }
      path = map.pathBetween(gridLocA, gridLocB)

      expect(path.length).toEqual(28)
      expect(path[0].x).toEqual(9)
      expect(path[0].y).toEqual(0)

    })
    it('returns empty array if no route', () => {
      let gridLocA = {
        x: 0,
        y: 9
      }
      let gridLocB = {
        x: 0,
        y: 0
      }
      path = map.pathBetween(gridLocA, gridLocB)
      expect(path.length).toEqual(0)
    })
  })

  describe('closestWalkable', () => {
    it('return self if walkable', () => {
      map = new WorldMap([
        [0, 1],
        [1, 1]
      ])
      expect(map.closestWalkable({
        x: 0,
        y: 0
      })).toEqual({
        x: 0,
        y: 0
      })
    })
    it('return top left if not walkable', () => {
      map2 = new WorldMap([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ])

      expect(map2.closestWalkable({
        x: 1,
        y: 1
      })).toEqual({
        x: 0,
        y: 0
      })
    })
  })
})