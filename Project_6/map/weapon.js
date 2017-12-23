// JavaScript Document

//----Weapon class build up by id, name, damage, position
let rndPos, suitable = false;

class Weapon {
    constructor(id, name, damages) {
        "use strict";
        this.id = id;
        this.name = name;
        this.damages = damages;
        this.position = 0;
    }
    initializePositionOnBoard(board) {

        while (suitable === false) {
            rndPos = [Math.floor(Math.random()*board.height), Math.floor(Math.random()*board.width)];
            suitable = board.isWeapon(rndPos);
        }
        board.addWeaponOnBoard(this.id, rndPos);
        this.position = rndPos;
    }
    initializePositionOnPlayer(player) {
        this.position = "player" + player.id;
    }
}