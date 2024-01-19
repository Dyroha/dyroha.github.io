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

//font size slider logic
let slider = document.getElementById("fontSize");
slider.oninput = function () {
    //change font size
    let value = this.value;
    let size = value.toString() + "px";
    outputBox.style.fontSize = size;
    setCookie("fontSize", size, 7);

    moveSNum(this);
};

slider.onmousedown = function () {
    moveSNum(this);
};
slider.onmouseup = function () {
    //make snum invisible
    let snum = document.getElementById("snumber");
    snum.style.display = "none";
};

function moveSNum(slider) {
    //make snumber change and follow slider thumb
    let value = slider.value;
    let sliderRect = slider.getBoundingClientRect();
    let snum = document.getElementById("snumber");
    snum.style.display = "block";
    snum.innerHTML = slider.value + "px";
    snum.style.top = sliderRect.top - slider.offsetHeight * 3 + "px";
    snum.style.left =
        sliderRect.left +
        (slider.value / slider.max) * slider.offsetWidth -
        snum.offsetWidth / 2 +
        "px";
}

//radio button text speed logic
