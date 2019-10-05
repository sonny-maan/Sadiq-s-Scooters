// const Person = require('../lib/person');
// const World = require('../lib/world');
function start(){
  document.getElementById("start-btn").style.display = 'none';
  canvas.width = 700;
  canvas.height = 700;
  document.body.insertBefore(canvas, document.body.childNodes[0]);
}

world = new World
person = new Person
// console.log(person === )
function create() {
  //  Opacity
  // world.generatePerson()
  context.globalAlpha = 0.7;
  // var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
  // context.fillStyle = color;
  // Each rectangle's size is (20 ~ 100, 20 ~ 100)
  let path = []
  let steps = Math.floor(Math.random() * 100)
  for (let i = 0; i < steps; i++) {
    path.push([Math.random(), Math.random()])
  }
  let options = {
    location: [0, 0],
    destination: [0, 0],
    path: path,
    speed: Math.random() / 10
  }
  world.generatePerson(options)
  console.log(world.people);
}

// function drawBalance() {
//
//
// context.font = "30px Arial";
//
// }

function drawPeople() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(world.balance,10,50);
  world.tick();
  // Remove people
  // Redraw all people
  var width = 20;
  var height = 20;

  people = world.people


  // redraw
  world.people.forEach(person1 => {
    if (person1.onVehicle) {
      context.fillRect(person1.location[0] * canvas.width, person1.location[1] * canvas.height, width + 20, height);
    } else {
      context.fillRect(person1.location[0] * canvas.width, person1.location[1] * canvas.height, width, height);
    }


    // draw lines to see where people are going.
    // does not affect the people or world at all
    context.lineWidth = 1
    context.strokeStyle = 'red'
    context.beginPath();
    context.moveTo(person1.location[0] * canvas.width, person1.location[1] * canvas.height);
    context.lineTo(person1.destination[0] * canvas.width, person1.destination[1] * canvas.height);
    context.stroke();

    if (person1.path[0]) {
      context.strokeStyle = 'green'
      context.beginPath();

      context.moveTo(person1.location[0] * canvas.width, person1.location[1] * canvas.height);
      context.lineTo(person1.path[0][0] * canvas.width, person1.path[0][1] * canvas.height);
      context.stroke();
      context.strokeStyle = 'blue'
      context.beginPath();
      context.moveTo(person1.destination[0] * canvas.width, person1.destination[1] * canvas.height);
      context.lineTo(person1.path[0][0] * canvas.width, person1.path[0][1] * canvas.height);
      context.stroke();
    }

  });

  world.dockingStations.forEach(dockingStation => {
    let eh1 = dockingStation._location[0]
    let eh2 = dockingStation._location[1]
    context.fillRect(eh1 * canvas.width, eh2 * canvas.height, 5, 15);

  });
  setTimeout(drawPeople, 50)
}



// setInterval(drawPeople, 50)

// function Square(width, height, color, x, y) {
//     this.Person = world.generatePerson()
//     context.fillRect(person._location[0], person._location[1], width, height);
//   }


function startGame() {
  start();
  create();
  drawPeople();
}
