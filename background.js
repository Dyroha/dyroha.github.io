const triangle = document.createElement("div");
triangle.classList.add("triangle");
const tflipped = triangle.cloneNode(true);
tflipped.classList.add("flipped");
const background = document.getElementById("background");
let width = background.offsetWidth;
let height = background.offsetHeight;
const theight = 173.2;
const twidth = 200;

let across = Math.round(width / twidth);
let down = Math.round(height / theight);
for (let i = 0; i < across * down; i++) {
    background.appendChild(triangle.cloneNode(true));
    background.appendChild(tflipped.cloneNode(true));
}
