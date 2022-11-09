function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


let lastHole;
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('duplicate hole');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

let lastHole;
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('duplicate hole');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
  }, time);
}
