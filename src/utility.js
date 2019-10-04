function distance2Between(loc1, loc2) {
  var x = loc1[0] - loc2[0]
  var y = loc1[1] - loc2[1]
  return ((x * x) + (y * y));
}

function locToMap(loc, map) {
  console.log(loc, map)
  let mapWidth = (1.0 * map[0].length)
  let mapHeight = (1.0 * map.length)
  return [Math.floor(loc[0] * mapWidth), Math.floor(loc[1] * mapHeight)]
}

function mapToLoc(locMap, map) {
  let mapWidth = map[0].length
  let mapHeight = map.length
  let gridWidth = 1.0 / mapWidth
  let gridHeight = 1.0 / mapHeight
  return [locMap[0] * gridWidth + (0.5 * gridWidth), locMap[1] * gridHeight + (0.5 * gridHeight)]
}