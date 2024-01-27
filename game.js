let gamePlaying = false;
let loss = false;
let gameTimer = 250;

let game = document.createElement("div");
let gameState = {
    0: Array(20).fill(" "),
    1: Array(20).fill(" "),
    2: Array(20).fill(" "),
};
let gameCounter = 0;
let playerLine = 1;
let playerColumn = 4;
let gameSize = 3;
const playerPiece = "<span class='snake'>-</span>";
const waterPiece = "<span class='water'>~</span>";
const barrierPiece = "<span class='barrier'>|</span>";
const goPiece = "<span class='bad'>x</span>";
const barrier = [barrierPiece, " ", " ", " "];

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

function stopGame(type) {
    // loss is 0 , quit is 1
    if (type == 0) {
        loss = true;
    }
    gamePlaying = false;
}

function resetGame(size) {
    gameSize = size;
    gameTimer = 250;
    playerLine = Math.floor(size / 2);

    gameState = {};
    for (let i = 0; i < size; i++) {
        gameState[i] = Array(20).fill(" ");
    }
    gameCounter = 0;
    printGame();
}

function startGame() {
    // make size change with the rest of the page
    game.style.fontSize = getCookie("fontSize");

    gamePlaying = true;
    loss = false;
    gameCounter = 0;
    outputBox.innerHTML +=
        "press q to quit game, use up and down arrows to move</br>";
    outputBox.appendChild(game);
    scrollToBottom();
    setTimeout(doGameLoop, gameTimer);
}

function doGameLoop() {
    if (gamePlaying) {
        // do game
        gameStateChange();
        // next game cycle
        setTimeout(doGameLoop, gameTimer);
    } else {
        if (loss) {
            setTimeout(function () {
                animateGameOver(playerColumn);
            }, 1000);
        } else {
            quitGame();
        }
    }
}

function animateGameOver(pos) {
    if (pos < 0) {
        quitGame();
    } else {
        for (let i = 0; i < gameSize; i++) {
            if (gameState[i][pos] == playerPiece) {
                gameState[i][pos] = goPiece;
            }
        }
        printGame();
        setTimeout(function () {
            animateGameOver(--pos);
        }, 100);
    }
}

function quitGame() {
    outputBox.removeChild(game);
    printOutput("Game over, score = " + gameCounter, 100);
    resetInput();
}

function gameStateChange() {
    if (gameCounter++ % 4 == 0) {
        addBarriers();
    }
    movePlayer();
    moveGame();
    printGame();
    if (gameTimer > 100) {
        gameTimer--;
    }
}

function printGame() {
    let gameText = `Score: ${gameCounter}<pre class='font'>${waterPiece}`;
    for (let i = 0; i < gameSize - 1; i++) {
        gameText += gameState[i].join("") + "</br>" + waterPiece;
    }
    gameText += gameState[gameSize - 1].join("") + "</br></pre>";
    game.innerHTML = gameText;
}

function moveGame() {
    for (let i = 0; i < gameSize; i++) {
        gameState[i] = gameState[i].slice(1);
    }
    //else replace next
    gameState[playerLine][playerColumn] = playerPiece;
}

function addBarriers() {
    let i = Math.floor(Math.random() * gameSize);
    addBlank(i);
    for (let j = 0; j < gameSize; j++) {
        if (j == i) {
            continue;
        }
        addBar(j);
    }
}

function addBar(line) {
    gameState[line].push(...barrier);
}

function addBlank(line) {
    gameState[line].push(...Array(4).fill(" "));
}

//player movement

function changePlayerPosition(direction) {
    playerLine = Math.min(gameSize - 1, Math.max(0, playerLine + direction));
}

function movePlayer() {
    // check if any are blocked
    if (gameState[playerLine][playerColumn + 1] === barrierPiece) {
        //if player pos one is blocked then end game
        stopGame(0);
    }
}
