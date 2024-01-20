let gamePlaying = false;
let gameTimer = 500;
const calcRegex = /^[0-9\s+\-*/()]*$/;
// help command text
let helpArr = [
    "commands available are as follows:",
    "help: opens the list of available commands",
    "calc {equation}: is used as a simple calculator with + - * / functionality",
    "echo {}: repeats last sent message",
    "play game: opens up a game you can play",
    "",
    "you can also use the up arrow key to select the last command",
];

document.body.addEventListener("keydown", (e) => {
    if (e.key == "q") {
        stopGame();
    }
});

function stopGame() {
    // console.log("q pressed");
    gamePlaying = false;
}

function doCommand(command) {
    if (command.startsWith("play game")) {
        startGame();
    } else if (command.startsWith("echo")) {
        printOutput(command.substring(5).trim());
    } else if (command.startsWith("help")) {
        printOutput(helpArr.join("\n- "));
    } else if (command.startsWith("calc")) {
        let calc = command.substring(5).trim();
        if (calcRegex.test(calc) & (calc != "")) {
            printOutput(eval(calc).toString());
        } else {
            printOutput("Error in equation, does not compute");
        }
    } else {
        printOutput("I do not know that command");
    }
    lastMessage = command;
}

function startGame() {
    gamePlaying = true;
    outputBox.innerHTML += "This is a game, quit with q </br>";
    setTimeout(doGameLoop, gameTimer);
}

function doGameLoop() {
    console.log("game loop");
    if (gamePlaying) {
        setTimeout(doGameLoop, gameTimer);
    } else {
        printOutput("Game finished");
        resetInput();
    }
}
