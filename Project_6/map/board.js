"use strict";

//-----Build up the board class where the game will take place, includes height , width, grid, player movements, weapons movements.

class Board {
    constructor(height, width, accessibility) {

        this.height = height;
        this.width = width;
        this.grid = (function(height, width) {
            const grid = new Array([]);
            for(let i = 1; i <= height; i++) {
                grid[i - 1] = [];
                for(let j = 1;j <= width; j++) {
                    grid[i - 1][j - 1] = new Cell(i - 1, j - 1, accessibility);
                }
            }
            return grid;
        })(height, width);
    }
    movePlayerOnBoard(id, lastPos, newPos) {
        if (lastPos !== 0) {
            this.grid[lastPos[0]][lastPos[1]].playerOnCell = 0;
            if(lastPos[0] > 0) {
                this.grid[lastPos[0] - 1][lastPos[1]].toggleTrigger();
            }
            if(lastPos[0] < this.height - 1) {
                this.grid[lastPos[0] + 1][lastPos[1]].toggleTrigger();
            }
            if(lastPos[1] > 0) {
                this.grid[lastPos[0]][lastPos[1] - 1].toggleTrigger();
            }
            if(lastPos[1] < this.width - 1) {
                this.grid[lastPos[0]][lastPos[1] + 1].toggleTrigger();
            }
        }
        this.grid[newPos[0]][newPos[1]].playerOnCell = id;
        if(newPos[0] > 0) {
            this.grid[newPos[0] - 1][newPos[1]].toggleTrigger();
        }
        if(newPos[0] < this.height - 1) {
            this.grid[newPos[0] + 1][newPos[1]].toggleTrigger();
        }
        if(newPos[1] > 0) {
            this.grid[newPos[0]][newPos[1] - 1].toggleTrigger();
        }
        if(newPos[1] < this.width - 1) {
            this.grid[newPos[0]][newPos[1] + 1].toggleTrigger();
        }
    }

     isWeapon(pos) {
        return !((this.grid[pos[0]][pos[1]].weaponOnCell > 3) || (this.grid[pos[0]][pos[1]].playerOnCell > 0) || (this.grid[pos[0]][pos[1]].accessible === false));
    }

    isPlayer(pos) {
        return !((this.grid[pos[0]][pos[1]].triggerCombat === true) || (this.grid[pos[0]][pos[1]].weaponOnCell > 0) || (this.grid[pos[0]][pos[1]].playerOnCell > 0) || (this.grid[pos[0]][pos[1]].accessible === false));
    }

    checkPlayerMovementOptions(pos, range) {
        let movementOptions = new Array([]), nbOptions = 0;
        for (let top = pos[0] - 1; top >= Math.max(pos[0] - range, 0); top -= 1) {
            if ((this.grid[top][pos[1]].accessible === true) && (this.grid[top][pos[1]].playerOnCell === 0)) {
                movementOptions[nbOptions] = [top, pos[1]];
                nbOptions += 1;
            } else {
                break;
            }
        }
        for (let bottom = pos[0] + 1; bottom <= Math.min(pos[0] + range, this.height - 1); bottom += 1) {
            if ((this.grid[bottom][pos[1]].accessible === true) && (this.grid[bottom][pos[1]].playerOnCell === 0)) {
                movementOptions[nbOptions] = [bottom, pos[1]];
                nbOptions += 1;
            } else {
                break;
            }
        }
        for (let left = pos[1] - 1; left >= Math.max(pos[1] - range, 0); left -= 1) {
            if ((this.grid[pos[0]][left].accessible === true) && (this.grid[pos[0]][left].playerOnCell === 0)) {
                movementOptions[nbOptions] = [pos[0], left];
                nbOptions += 1;
            } else {
                break;
            }
        }
        for (let right = pos[1] + 1; right <= Math.min(pos[1] + range, this.width - 1); right += 1) {
            if ((this.grid[pos[0]][right].accessible === true) && (this.grid[pos[0]][right].playerOnCell === 0)) {
                movementOptions[nbOptions] = [pos[0], right];
                nbOptions += 1;
            } else {
                break;
            }
        }
        return movementOptions;
    }

    addWeaponOnBoard(id, pos) {
        this.grid[pos[0]][pos[1]].weaponOnCell = id;

    }
}