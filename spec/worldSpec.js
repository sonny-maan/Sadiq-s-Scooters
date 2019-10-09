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

  })
  it('world will generate a new person', () => {
    expect(Object.keys(world.generatePerson())).toContain('location');
    expect(world.people.length).toEqual(1)
    expect(Object.keys(world.people[0])).toContain('location');
  });




});