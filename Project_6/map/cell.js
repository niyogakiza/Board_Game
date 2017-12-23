// JavaScript Document

//---Cells class initialization
class Cell {
    constructor(rowIndex, colIndex, accessibility) {
        "use strict";
        this.row = rowIndex;
        this.col = colIndex;
        this.triggerCombat = false;
        this.weaponOnCell = 0;
        this.playerOnCell = 0;
        this.accessible = accessibility > Math.random();

    }

    toggleTrigger() {
        this.triggerCombat = this.triggerCombat !== true;
    }
}