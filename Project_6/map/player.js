// JavaScript Document

//---Player class Build up by id, weapon and on board game positions
class Player {
    constructor(id, weapon, board) {
        "use strict";
        this.id = id;
        this.score = 100;
        this.weapon = weapon;
        this.lastPosition = 0;
        this.position = (function(id, last, board) {
            let rndPos, suitable = false;
            while (suitable === false) {
                rndPos = [Math.floor(Math.random()*board.height), Math.floor(Math.random()*board.width)];
                suitable = board.isPlayer(rndPos);
            }
            board.movePlayerOnBoard(id, last, rndPos);
            return rndPos;
        })(this.id, this.lastPosition, board);
        this.movement = 3;
        this.defensePosture = false;

    }

    makeMovement(newPos, board) {
        this.lastPosition = this.position;
        board.movePlayerOnBoard(this.id, this.lastPosition, newPos);
        this.position = newPos;
    }

    lastMovementCells() {
        let lastMovement = new Array([]), deltaRow, deltaCol;
        deltaRow = this.position[0] - this.lastPosition[0];
        deltaCol = this.position[1] - this.lastPosition[1];

        if(deltaRow > 0) {
            for (let right = 1; right <= deltaRow; right += 1) {
                lastMovement[right - 1] = [this.lastPosition[0] + right, this.lastPosition[1]];
            }
        } else if (deltaRow < 0) {
            for (let left = 1; left <= Math.abs(deltaRow); left += 1) {
                lastMovement[left - 1] = [this.lastPosition[0] - left, this.lastPosition[1]];
            }
        } else if (deltaCol > 0) {
            for (let bottom = 1; bottom <= deltaCol; bottom += 1) {
                lastMovement[bottom - 1] = [this.lastPosition[0], this.lastPosition[1] + bottom];
            }
        } else if (deltaCol < 0) {
            for (let top = 1; top <= Math.abs(deltaCol); top += 1) {
                lastMovement[top - 1] = [this.lastPosition[0], this.lastPosition[1] - top];
            }
        }
        return lastMovement;
    }

    takeDamages(damages) {
        if(this.defensePosture === true) {
            this.score -= (damages / 2);
        } else {
            this.score -= damages;
        }
    }
}