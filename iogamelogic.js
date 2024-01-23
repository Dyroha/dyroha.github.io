const outputBox = document.getElementById("output");
const inputBox = document.getElementById("text-input");
let lastMessage = "";
let pauseTime = 100;
let startingText = "Hello user, type help to see the available commands";
let typing = false;
let count = 0;

let rtinput = document.createElement("div");
rtinput.id += "rtinput";

let idleArrow = document.createElement("span");
idleArrow.innerHTML = "-> ";
idleArrow.classList += "input-start ";
// idleArrow.classList += "idling";
rtinput.appendChild(idleArrow);

let i = document.createElement("span");
i.classList += "rtinput-text";
rtinput.appendChild(i);

function letterByLetter(text, t) {
    if (text == "") {
        outputBox.innerHTML += "</br>";
        typing = false;
        idleOutputBox();
        scrollToBottom();
        return;
    } else if (text.startsWith("\n")) {
        outputBox.innerHTML += "</br>";
    } else {
        outputBox.innerHTML += text.charAt(0);
    }
    setTimeout(() => letterByLetter(text.substring(1)), t);
}

function outputNumber() {
    return "<span class='output-start'>[" + (count++).toString() + "]</span>";
}

function printOutput(text, t = pauseTime) {
    typing = true;
    outputBox.innerHTML += outputNumber();
    letterByLetter(text, t);
}

function sendInput() {
    if (!typing) {
        outputBox.removeChild(rtinput);
        let text = inputBox.value;
        resetInput();
        outputBox.innerHTML +=
            "<span class='input-start'>-></span> " + text + "</br> ";
        doCommand(text);
    }
}

inputBox.addEventListener("keyup", function (event) {
    if ((event.key === "Enter") & (inputBox.value != "")) {
        event.preventDefault();
        sendInput();
    } else if (event.key === "q") {
        stopGame();
        if (gamePlaying) {
            resetInput();
        }
    } else if (event.key === "ArrowUp") {
        inputBox.value = lastMessage;
        i.innerHTML = lastMessage;
    }
    updateRTInput();
});

inputBox.addEventListener("keydown", function (event) {
    if (
        (event.key === "ArrowLeft") |
        (event.key === "ArrowRight") |
        (event.key === "ArrowUp") |
        (event.key === "ArrowDown")
    ) {
        console.log("arrow pressed");
        event.preventDefault();
        if (gamePlaying) {
            if (event.key === "ArrowUp") {
                changePlayerPosition(-1);
            } else if (event.key === "ArrowDown") {
                changePlayerPosition(1);
            }
        }
    }
});

function resetInput() {
    i.innerHTML = "";
    inputBox.value = "";
}

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
    let snum = document.getElementById("snumber");
    snum.style.display = "block";
    snum.innerHTML = value + "px";
    snum.style.left = (slider.value / slider.max) * slider.offsetWidth + "px";
}

//radio button text speed logic
let ts1 = document.getElementById("ts1");
ts1.onchange = function () {
    pauseTime = this.value;
    setCookie("pauseTime", this.value);
};

let ts2 = document.getElementById("ts2");
ts2.onchange = function () {
    pauseTime = this.value;
    setCookie("pauseTime", this.value);
};

let ts3 = document.getElementById("ts3");
ts3.onchange = function () {
    pauseTime = this.value;
    setCookie("pauseTime", this.value);
};
