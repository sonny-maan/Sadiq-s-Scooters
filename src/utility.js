util = {
  setOptions: function (self, options) {
    if (options) {
      let optionKeys = Object.keys(options)
      let selfKeys = Object.keys(self)
      optionKeys.forEach(optionKey => {
        if (selfKeys.includes(optionKey)) {
          self[optionKey] = options[optionKey]
        }
      })
    }
  }
}

// function setOptions(options) {
//   if (options) {
//     let optionKeys = Object.keys(options)
//     let dockingStationKeys = Object.keys(this)

//     optionKeys.forEach(optionKey => {
//       if (dockingStationKeys.includes(optionKey)) {
//         this[optionKey] = options[optionKey]
//       }
//     })
//   }
// }

// function locToMap(loc, map) {
//   let mapWidth = (1.0 * map[0].length)
//   let mapHeight = (1.0 * map.length)
//   return [Math.floor((loc.x * mapWidth) + (1.0 / (mapWidth * mapWidth))), Math.floor((loc.y * mapHeight) + (1.0 / (mapHeight * mapHeight)))]
// }

// function mapToLoc(locMap, map) {
//   let mapWidth = map[0].length
//   let mapHeight = map.length
//   let gridWidth = 1.0 / mapWidth
//   let gridHeight = 1.0 / mapHeight
//   return [locMap[0] * gridWidth, locMap[1] * gridHeight]
// }