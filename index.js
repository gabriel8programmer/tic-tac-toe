
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
    //runGame
    updateGame();
}

function updateGame() {
    //init game
    currentPlayer.className = "";
    currentPlayer.innerText = players[move];
    currentPlayer.classList.add(playerColors[move]);

    //verify combinations
    combinations.forEach(function (combination) {
        const d1 = combination[0];
        const d2 = combination[1];
        const d3 = combination[2];

        if (boxes[d1].innerText !== "" &&
            boxes[d1].innerText === boxes[d2].innerText &&
            boxes[d2].innerText === boxes[d3].innerText) {
            //it was gameover
            gameover = true;
        }
    });
}

function changePlayer(){
    move = (move === 0) ? 1 : 0;
    updateGame();
}

function play(e) {
    const element = e.target;

    if (gameover || element.innerText !== "") {
        return;
    }

    element.innerText = stringMoves[move];
    //change player
    changePlayer();
}

btnStartGame.addEventListener("click", startGame);

document.querySelectorAll(".input").forEach(input => {
    input.addEventListener("input", function (e) {
        e.preventDefault();
        const element = e.target;
    });
});

boxes.forEach(function (boxElement) {
    boxElement.addEventListener("click", play);
});
