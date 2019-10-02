// const Person = require('../lib/person');
// const World = require('../lib/world');



var body = document.getElementsByTagName("body")[0];
var canvas = document.createElement("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var context = canvas.getContext("2d");
body.appendChild(canvas);

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

function drawPeople() {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  world.tick();
  // Remove people
  // Redraw all people
  var width = 20;
  var height = 20;
  people = world.people
  people.forEach(Person => {
    context.fillRect(Person._location[0] * canvas.width, Person._location[1] * canvas.height, width, height);
  });

}
setInterval(drawPeople, 50)

// function Square(width, height, color, x, y) {
//     this.Person = world.generatePerson()

//     context.fillRect(person._location[0], person._location[1], width, height);
//   }

document.getElementById('button').addEventListener('click', create);