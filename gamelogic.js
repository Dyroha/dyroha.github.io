const outputBox = document.getElementById("output");
const inputBox = document.getElementById("text-input");
let pauseTime = 100;
let startingText = "Hello player, enter some text";
let typing = false;
let count = 0;

function letterByLetter(text) {
    if (text == "") {
        typing = false;
        return;
    }
    outputBox.innerHTML += text.charAt(0);
    setTimeout(() => letterByLetter(text.substring(1)), pauseTime);
}

function outputNumber() {
    return "[" + (count++).toString() + "] ";
}

function printOutput(text) {
    typing = true;
    outputBox.innerHTML += outputNumber();
    letterByLetter(text);
}

function sendInput() {
    if (!typing) {
        let text = inputBox.value;
        outputBox.innerHTML += "</br>-> " + text + "</br>";
        printOutput("That's very interesting, tell me more");
    }
}

printOutput(startingText);
