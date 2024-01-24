const calcRegex = /^[0-9\s+\-*/()]*$/;
// help command text
let helpArr = [
    "commands available are as follows:",
    "help: opens the list of available commands",
    "calc {equation}: is used as a simple calculator with + - * / functionality",
    "echo {text}: repeats last sent message",
    "play game: opens up a game you can play",
    "",
    "you can also use the up arrow key to select the last command",
];

document.body.addEventListener("keydown", (e) => {
    if (e.key == "q") {
        stopGame();
    }
});

function doCommand(command) {
    if (command.startsWith("play game")) {
        let difficulty = command.substring(9).trim();
        if (difficulty == "easy") {
            resetGame(2);
        } else if (difficulty == "hard") {
            resetGame(5);
        } else {
            resetGame(3);
        }
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
