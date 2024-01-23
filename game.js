let gamePlaying = false;
let gameTimer = 500;

let game = document.createElement("div");
let gameState = {
    0: " ".repeat(20),
    1: " ".repeat(20),
    2: " ".repeat(20),
};
let gameCounter = 0;
let barrier = "|   ";
let playerLine = 1;
let playerColumn = 4;

//controls

outputBox.addEventListener("keydown", function (e) {
    if (gamePlaying) {
        if (e.key === "ArrowUp") {
            changePlayerPosition(-1);
        } else if (e.key === "ArrowDown") {
            changePlayerPosition(1);
        }
    }
});

function stopGame() {
    gamePlaying = false;
}

function resetGame() {
    gameTimer = 500;
    gameState = {
        0: " ".repeat(20),
        1: " ".repeat(20),
        2: " ".repeat(20),
    };
    gameCounter = 0;
    game.innerHTML =
        "<pre>~" +
        gameState[0] +
        "</br>~" +
        gameState[1] +
        "</br>~" +
        gameState[2] +
        "</br></pre>";
}

function startGame() {
    gamePlaying = true;
    gameCounter = 0;
    outputBox.innerHTML += "press q to quit game</br>";
    outputBox.appendChild(game);
    setTimeout(doGameLoop, gameTimer);
}

function doGameLoop() {
    console.log("game loop");
    if (gamePlaying) {
        // do game
        gameStateChange();
        // next game cycle
        setTimeout(doGameLoop, gameTimer);
    } else {
        resetGame();
        outputBox.removeChild(game);
        printOutput("Game finished, score = " + gameCounter);
        resetInput();
    }
}

function gameStateChange() {
    if (gameCounter++ % 4 == 0) {
        addBarriers();
    }
    let gameText =
        "<pre>~" +
        gameState[0] +
        "</br>~" +
        gameState[1] +
        "</br>~" +
        gameState[2] +
        "</br></pre>";
    game.innerHTML = gameText;
    movePlayer();
    moveGame();
}

function moveGame() {
    for (let i = 0; i < 3; i++) {
        gameState[i] = gameState[i].slice(1);
    }
}

function addBarriers() {
    let i = Math.floor(Math.random() * 3);
    addBlank(i);
    if (i == 0) {
        addBar(1);
        addBar(2);
    } else if (i == 1) {
        addBar(0);
        addBar(2);
    } else {
        addBar(0);
        addBar(1);
    }
}

function addBar(line) {
    gameState[line] += barrier;
}

function addBlank(line) {
    gameState[line] += "    ";
}

//helper function

String.prototype.replaceAt = function (index, replacement) {
    return (
        this.substring(0, index) +
        replacement +
        this.substring(index + replacement.length)
    );
};

//player movement

function changePlayerPosition(direction) {
    playerLine = Math.min(2, Math.max(0, playerLine + direction));
    console.log(playerLine);
}

function movePlayer() {
    gameState[playerLine] = gameState[playerLine].replaceAt(playerColumn, ".");
    if (playerLine == 0) {
        gameState[1] = gameState[1].replaceAt(playerColumn, " ");
        gameState[2] = gameState[2].replaceAt(playerColumn, " ");
    } else if (playerLine == 1) {
        gameState[0] = gameState[0].replaceAt(playerColumn, " ");
        gameState[2] = gameState[2].replaceAt(playerColumn, " ");
    } else {
        gameState[0] = gameState[0].replaceAt(playerColumn, " ");
        gameState[1] = gameState[1].replaceAt(playerColumn, " ");
    }
}
