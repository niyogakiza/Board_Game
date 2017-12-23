// JavaScript Document
let currentGame;
let currentMovements;

function playGame() {
    "use strict";
    // currentGame = new Game(10,10,0.9,0.75,4);
    currentGame = new Game(10,10,2,3,8);
    displayGame(currentGame);

    currentGame.nextMovementTurn();
}

 function setupMovementOptions(movementOptions){
    currentMovements = movementOptions;
    for (let option in currentMovements) {
        $("#cell-" + currentMovements[option][0] + "-" + currentMovements[option][1]).bind("click", {row: currentMovements[option][0], col: currentMovements[option][1]}, Game.makeMovementTurn);
        toggleMovement(currentMovements[option]);
    }
}
function setupCombatOptions() {
    // language=JQuery-CSS format=false
    $(`button[name="attack"]`).bind(`click`, {option: `atk`}, Game.makeCombatTurn);
    $(`button[name="defense"]`).bind(`click`, {option: `def`}, Game.makeCombatTurn);
}

function unsetMovementOptions(movementOptions) {
    for (option in currentMovements) {
        $("#cell-" + currentMovements[option][0] + "-" + currentMovements[option][1]).unbind("click");
        toggleMovement(currentMovements[option]);
    }
    displayPlayer(currentGame.currentPlayer);
    movementOptions = null;
}
function unsetCombatOptions() {
    // language=JQuery-CSS
    $("button[name='attack']").unbind(`click`);
    $("button[name='defense']").unbind(`click`);
}

$(document).ready(function() {
    // language=JQuery-CSS
    $(`button[name='playGame']`).click(playGame);
    playGame();
});