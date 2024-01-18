const outputBox = document.getElementById("output");
const inputBox = document.getElementById("text-input");
let pauseTime = 100;
let startingText = "Hello player, enter some text";
let typing = false;
let count = 0;

let rtinput = document.createElement("div");
rtinput.id += "rtinput";
let i = document.createElement("span");
i.classList += "rtinput-text";
let idleArrow = document.createElement("span");
idleArrow.innerHTML = "-> ";
idleArrow.classList += "input-start ";
idleArrow.classList += "idling";
rtinput.appendChild(idleArrow);
rtinput.appendChild(i);

function letterByLetter(text) {
    if (text == "") {
        outputBox.innerHTML += "</br>";
        typing = false;
        idleOutputBox();
        scrollToBottom();
        return;
    }
    outputBox.innerHTML += text.charAt(0);
    setTimeout(() => letterByLetter(text.substring(1)), pauseTime);
}

function outputNumber() {
    return "<span class='output-start'>[" + (count++).toString() + "]</span>";
}

function printOutput(text) {
    typing = true;
    outputBox.innerHTML += outputNumber();
    letterByLetter(text);
}

function sendInput() {
    if (!typing) {
        outputBox.removeChild(rtinput);
        let text = inputBox.value;
        inputBox.value = "";
        outputBox.innerHTML +=
            "<span class='input-start'>-></span> " + text + "</br> ";
        printOutput("That's very interesting, tell me more");
    }
}

inputBox.addEventListener("keypress", function (event) {
    if ((event.key === "Enter") & (inputBox.value != "")) {
        event.preventDefault();
        sendInput();
    }
});

function idleOutputBox() {
    outputBox.appendChild(rtinput);
}

function updateRTInput() {
    i.innerHTML = inputBox.value;
}

function inputFocus() {
    inputBox.focus();
}

function scrollToBottom() {
    outputBox.scrollTo(0, outputBox.scrollHeight);
}

printOutput(startingText);

//Menu logic
function menuClick() {
    console.log("menu clicked");
}

let slider = document.getElementById("fontSize");
slider.oninput = function () {
    console.log(outputBox.style.fontSize);
    outputBox.style.fontSize = this.value.toString() + "px";
};
