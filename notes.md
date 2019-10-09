Co-authored-by: jodifoster <51475537+JodiFoster@users.noreply.github.com>
Co-authored-by: jaitone <51136692+jaitone@users.noreply.github.com>
Co-authored-by: fardenti <38498908+fardenti@users.noreply.github.com>
Co-authored-by: sonny-maan <42817066+sonny-maan@users.noreply.github.com>
0 is open
1 is wall
grid = [
  [1,1,1,1,0,0,0,0,0,0],
  [1,1,1,1,0,1,1,1,1,1],
  [1,1,1,1,0,1,1,1,1,1],
  [1,1,1,1,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,0,1,1],
  [1,1,0,0,0,1,1,0,1,1],
  [1,1,0,1,0,1,1,0,1,1],
  [1,1,0,1,0,0,0,0,1,1],
  [0,0,0,1,1,1,1,0,1,1],
  [0,1,1,1,1,1,1,0,0,0]
]



var graph = new Graph([
  [0,0,0,0], // 0 is open
  [1,0,0,1],
  [1,1,0,0]
]);
var start = graph.nodes[0][0];
var end = graph.nodes[1][2];
var result = astar.search(graph.nodes, start, end);

world.generateDockingStation({location: [0.5,0.1]})
world.generateDockingStation({location: [0.5,0.8]})
world.generatePerson({location: [0.4,0],destination: [0.4,1],path: [],speed: 0.001})


world.dockingStations[0].location
world.dockingStations[1].location
world.people.location

https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/




world.balance = 10000
world.generateDockingStation({location: new Location(0.44,0.15)})
world.generateDockingStation({location: new Location(0.25,0.75)})
world.generateDockingStation({location: new Location(0.04,0.85)})
world.generateDockingStation({location: new Location(0.84,0.95)})


game.world.personGenerator.generate()


world.generatePerson({location: new Location(0.95,0.98),destination: new Location(0.05,0.95),path: [],speed: 0.002}); drawPeople();
world.generatePerson({location: new Location(0.45,0.008),destination: new Location(0.05,0.9),path: [],speed: 0.002}); drawPeople();
world.generatePerson({location: new Location(0.45,0.008),destination: new Location(0.95,0.98),path: [],speed: 0.002}); drawPeople();
world.generatePerson({location: new Location(0.45,0.008),destination: new Location(0.05,0.9),path: [],speed: 0.002}); drawPeople();
world.generatePerson({location: new Location(0.45,0.008),destination: new Location(0.05,0.9),path: [],speed: 0.002}); drawPeople();
world.generatePerson({location: new Location(0.45,0.008),destination: new Location(0.05,0.9),path: [],speed: 0.001}); drawPeople();
world.generatePerson({location: new Location(0.45,0.008),destination: new Location(0.05,0.9),path: [],speed: 0.0001}); drawPeople();


DOM:

World():
  dockingStations
  People

  tick()
  generatePerson()
  generateDockingStation()

DockingStation():
  capacity
  dockedVehicles

  release()
  dock()

Scooter():
  speed

Person():
  location
  destination
  behaviour

  walk()
  interact()
  checkBehaviour()

are options good?

