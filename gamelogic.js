const outputBox = document.getElementById("output");
const inputBox = document.getElementById("text-input");
let pauseTime = 100;
let startingText = "Hello player, enter some text";
let typing = false;

function letterByLetter(text) {
    if (text == "") {
        typing = false;
        return;
    }
    outputBox.innerHTML += text.charAt(0);
    setTimeout(() => letterByLetter(text.substring(1)), pauseTime);
}

function sendInput() {
    if (!typing) {
        typing = true;
        let text = inputBox.value;
        outputBox.innerHTML += "</br>";
        letterByLetter(text);
    }
}

letterByLetter(startingText);
