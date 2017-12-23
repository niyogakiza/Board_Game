// JavaScript Document

"use strict";
let $row, $cell;
let classList;

//---------- Building up the Display Board game, display player, score life and weapon details---------

function displayGame(game) {
    displayBoard(game.board);

    for (const player in game.players) {
        displayPlayer(game.players[player]);
        displayScore(game.players[player]);
    }

    for (const weapon in game.weapons) {
        displayWeapon(game.weapons[weapon]);
    }
}

//---Building up Board display by Jquery  with it's cells and rows, accessible cells and inaccessible-----

function displayBoard(board) {

    const $board = $("#board");

    $board.html("");
    for(let i = 0; i < board.grid.length; i++) {
        $row = $("<div class='row'></div>");
        for(let j=0; j < board.grid[i].length; j++) {
            $cell = $("<div class='cell'></div>");
            $cell.attr("id", "cell-" + board.grid[i][j].row + "-" + board.grid[i][j].col);
            board.grid[i][j].accessible ? $cell.addClass("cell-accessible") : $cell.addClass("cell-inaccessible");
            $cell.appendTo($row);
        }
        $row.appendTo($board);
    }
}
//-----Building up weapon display by Jquery  and it's information, displaying damage, weapon icons, and all functionality by position and cells movements------

function displayWeapon(weapon) {

    if (weapon.position === 0) {
    } else if ((typeof weapon.position === "string") && weapon.position.startsWith("player")) {
        classList = $(`#${weapon.position}-controls`).find(`.player-weapon-icon`).attr("class").split(/\s+/);
        $.each(classList, function(index, item){
            if (item !== "player-weapon-icon") {
                $("#" + weapon.position + "-controls .player-weapon-icon").removeClass(item);
            }
        });
        $("#" + weapon.position + "-controls .player-weapon-icon").addClass("cell-weapon" + weapon.id);
        $("#" + weapon.position + "-controls .player-weapon-info").html("Name :"+weapon.name + "<br>Damage : " + weapon.damages);
    } else {
        classList = $(`#cell-${weapon.position[0]}-${weapon.position[1]}`).attr("class").split(/\s+/);
        $.each(classList, function(index, item){
            if ((item === "cell") || (item === "cell-accessible") || (item === "cell-inaccessible") || (item.startsWith("cell-player"))) {

            } else {
                $("#cell-" + weapon.position[0] + "-" + weapon.position[1]).removeClass(item);
            }
        });
        $("#cell-" + weapon.position[0] + "-" + weapon.position[1]).addClass("cell-weapon" + weapon.id);
    }
}
//-------Building up Player positions by Jquery----

function displayPlayer(player) {

    if (player.lastPosition !== 0) {
        $("#cell-" + player.lastPosition[0] + "-" + player.lastPosition[1]).removeClass("cell-player" + player.id);
    }
    $("#cell-" + player.position[0] + "-" + player.position[1]).addClass("cell-player" + player.id);
}
//--display Player life score by player id full life is 100.-----

function displayScore(player) {

    $("#player" + player.id + "-controls .player-score").html("Score Life: "+player.score + "/100");
}

function toggleMovement(movement) {

    if ($(`#cell-${movement[0]}-${movement[1]}`).hasClass("cell-movement")) {
        $("#cell-" + movement[0] + "-" + movement[1]).removeClass("cell-movement");
    } else {
        $("#cell-" + movement[0] + "-" + movement[1]).addClass("cell-movement");
    }
}