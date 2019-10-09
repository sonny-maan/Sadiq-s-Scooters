describe('world', () => {

  let world;

  beforeEach(() => {
    world = new World();
  });
  describe('generate docking stations', () => {

    it('world will generate a new docking station', () => {
      expect(Object.keys(world.generateDockingStation())).toContain('location');
      expect(world.dockingStations.length).toEqual(1)
      expect(Object.keys(world.dockingStations[0])).toContain('location');
    });

    it('changes a grid to walkable if placed', () => {
      let grid = [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 1]
      ]
      world.map = new WorldMap(grid)
      expect(world.map.isNotWalkable({
        x: 2,
        y: 0
      })).toEqual(true)

      let newDsLocation = world.map.centerOfGrid({
        x: 2,
        y: 0
      })
      world.generateDockingStation({
        location: newDsLocation
      })
      expect(world.map.isWalkable({
        x: 2,
        y: 0
      })).toEqual(true)

    })

    it('prevents two docking stations from being made in the same grid', () => {
      //default map is one grid
      let ds1 = world.generateDockingStation()
      expect(world.dockingStations.length).toEqual(1)
      let ds1GridLoc = world.map.gridLocFromLoc(ds1.location)

      expect(ds1GridLoc).toEqual({
        x: 0,
        y: 0
      })

      expect(world.generateDockingStation({}, true)).toEqual(undefined)
      expect(world.dockingStations.length).toEqual(1)


    })

    it('snaps to center of grid', () => {
      let loc1 = new Location(0.1, 0.1)
      let ds1 = world.generateDockingStation({
        location: loc1
      }, false, false, true)
      let ds2 = world.generateDockingStation({
        location: loc1
      }, false, false, false)
      expect(ds1.location.near(new Location(0.5, 0.5), 0.01)).toEqual(true)
      expect(ds2.location.near(new Location(0.1, 0.1), 0.01)).toEqual(true)
    })

    it('only allows docking stations to be placed in road adjacent grids', () => {
      let grid = [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 1]
      ]
      world.map = new WorldMap(grid)

      let loc1 = world.map.centerOfGrid({
        x: 0,
        y: 0
      })
      let loc2 = world.map.centerOfGrid({
        x: 2,
        y: 2
      })
      let loc3 = world.map.centerOfGrid({
        x: 1,
        y: 1
      })
      expect(world.generateDockingStation({
        location: loc1
      }, true, true)).toEqual(undefined)
      expect(world.dockingStations.length).toEqual(0)
      expect(world.generateDockingStation({
        location: loc2
      }, true, true)).toEqual(undefined)
      expect(world.map.isWalkable({
        x: 1,
        y: 1
      })).toEqual(false)
      expect(world.dockingStations.length).toEqual(0)
      let ds = world.generateDockingStation({
        location: loc3
      }, true, true)
      expect(world.dockingStations.length).toEqual(1)

      expect(world.map.isWalkable({
        x: 1,
        y: 1
      })).toEqual(true)

      expect().toEqual(undefined)
    })



  })
  it('world will generate a new person', () => {
    expect(Object.keys(world.generatePerson())).toContain('location');
    expect(world.people.length).toEqual(1)
    expect(Object.keys(world.people[0])).toContain('location');
  });




});