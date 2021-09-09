"use strict";

const NUM_ROWS = 3;
const NUM_IMAGES = 100;
const IMAGES = [];

for (let i = 0; i < NUM_IMAGES; i++) {
  let width = (Math.floor(Math.random() * 3) + 2) * 100;
  let height = (Math.floor(Math.random() * 3) + 2) * 100;
  IMAGES.push('https://source.unsplash.com/collection/190727/1600x900${width}/${height}`);
}

let rows = [];

for (let i = 0; i < NUM_ROWS; i++) {
  let row = document.createElement('div');
  row.classList.add('row');
  rows.push(row);
}

let wall = document.getElementById('wall');

for (let i = 0; i < IMAGES.length; i++) {
  let index = i % rows.length;
  let row = rows[index];
  let onBottomRow = index === rows.length - 1;

  if (onBottomRow) {
    let frame = document.createElement('div');
    frame.classList.add('frame');
    frame.innerHTML = `
      <img src="${IMAGES[i]}">
      <div class="reflection">
        <img src="${IMAGES[i]}">
      </div>
    `;
    row.appendChild(frame);
  } else {
    let img = document.createElement('img');
    img.src = IMAGES[i];
    row.appendChild(img);
  }
}

rows.forEach(row => {
  wall.appendChild(row);
});

let debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

let scrollPosition = 0;
let scrollWall = debounce(event => {
  scrollPosition -= event.deltaY;
  wall.style.transform = `rotateY(45deg) translateX(${scrollPosition}px)`;
}, 10);
window.addEventListener('wheel', scrollWall);
