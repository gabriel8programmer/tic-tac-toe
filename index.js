
const root = document.querySelector(":root");
const btnTheme = document.querySelector("#change-theme");
//get elements of the config
const config = document.querySelector("#config");
const inputPlayer1 = document.querySelector("#input-player1");
const inputPlayer2 = document.querySelector("#input-player2");
const btnStartGame = document.querySelector("#start-game");

//get game elements
const game = document.querySelector("#game");
const currentPlayer = document.querySelector("#current-player");
const boxes = document.querySelectorAll(".box");
const result = document.querySelector(".result");
const btnRestartGame = document.querySelector("#restart-game");
const btnBackMenu = document.querySelector("#back-menu");

const stringMoves = ["x", "o"];
const playerColors = ["mark-p1", "mark-p2"];
let players = [];

const combinations = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6]
];

let move = 0;
let gameover = false;

function startGame() {
    const player1 = inputPlayer1.value;
    const player2 = inputPlayer2.value;

    if ((!player1 || !player2)) {
        alert("Digite o nome dos dois jogadores para prosseguir!");
        return;
    }
    if (player1 === player2) {
        alert("Jogadores com o mesmo nome não são permitido.\nInforme nomes diferentes!");
        return;
    }

    //set players
    players = [player1, player2];
    //clear the inputs
    inputPlayer1.value = "";
    inputPlayer2.value = "";
    //hide the config names
    config.classList.add("hide");
    //show the screen of the game
    game.classList.remove("hide");
    //update currentPlayer
    updateCurrentPlayer();
}

function disableAllBoxes() {
    boxes.forEach(function (box) {
        box.classList.add("disabled");
    });
}

function changePlayer() {
    move = (move === 0) ? 1 : 0;
}

function verifyCombinations() {
    let countCombinations = 0;
    combinations.forEach(function (combination) {
        const d1 = combination[0];
        const d2 = combination[1];
        const d3 = combination[2];

        const thereWasCombination = boxes[d1].innerText !== "" &&
            boxes[d1].innerText === boxes[d2].innerText &&
            boxes[d2].innerText === boxes[d3].innerText;

        if (!thereWasCombination) {
            return;
        }

        gameover = true;
        countCombinations++;
        //boxes hilighter
        boxes[d1].className = "box " + playerColors[move];
        boxes[d2].className = "box " + playerColors[move];
        boxes[d3].className = "box " + playerColors[move];

        //test if the player is win
        if (move === 0) {
            result.innerText = players[0] + " Venceu!";
            //change class result
            result.className = "result " + playerColors[0];
        } else {
            result.innerText = players[1] + " Venceu!";
            //change class result
            result.className = "result " + playerColors[1];
        }

        //disable all boxes
        disableAllBoxes();
    });

    if (countCombinations === 0) {
        changePlayer();
    }
}

function verifyBreakEven() {
    //test if there was gameover
    if (gameover) {
        return;
    }

    let countBoxMarked = 0;
    boxes.forEach(function (box) {
        if (box.innerText !== "") {
            countBoxMarked++;
        }
    });

    //test if there wasn't a break even
    if (countBoxMarked < 9) {
        return;
    }

    gameover = true;
    result.innerText = "empatou!";
    result.className = "result mark-break-even";

    //disable all boxes
    disableAllBoxes();
}

function updateCurrentPlayer() {
    currentPlayer.innerText = players[move];
    currentPlayer.className = playerColors[move];
}

function updateGame() {
    //verify combinations
    verifyCombinations();
    //verify break even
    verifyBreakEven();
    //update currentPlayer
    updateCurrentPlayer();
}

function play(e) {
    //get element
    const element = e.target;

    if (gameover || element.innerText !== "") {
        return;
    }

    element.innerText = stringMoves[move];
    //update game
    updateGame();
}

function clearBoxes() {
    boxes.forEach(function (box) {
        box.innerText = "";
        box.className = "box";
    });
}

function restartGame() {
    //clear all boxes
    clearBoxes();
    //clear result
    result.innerText = "";
    result.className = "result";
    //restart variables game
    move = 0;
    gameover = false;
    //update game
    updateCurrentPlayer();
}

function backMenu() {
    //restart game
    restartGame();
    //hide the game
    game.classList.add("hide");
    //show menu
    config.classList.remove("hide");
}

btnStartGame.addEventListener("click", startGame);

boxes.forEach(function (boxElement) {
    boxElement.addEventListener("click", play);
});

//change theme
btnTheme.addEventListener("click", function () {
    root.classList.toggle("light-theme");
    //change text button
    const themeText = (root.classList.contains("light-theme") ? "tema / escuro" : "tema / claro");
    btnTheme.innerText = themeText;
});

btnRestartGame.addEventListener("click", restartGame);

btnBackMenu.addEventListener("click", backMenu);