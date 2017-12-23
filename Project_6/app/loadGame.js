"use strict";
/* Weapon names and their values,
*functionality for weapon availability
* player weapon  use,
* end of the game status and the message
* Movement condition flow
* Combat conditions by limited number of life score
* Combat rules by attack or defense options.*/
let weapon;
let oldWeapon, newWeapon;
class Game {
    constructor(boardWidth, boardHeight, boardAccessibility, weaponAvailability, maxBonusWeapons) {

        this.board = new Board(boardWidth, boardHeight, boardAccessibility);
        const baseWeapons = [new Weapon(1, "Mace", 10),
            new Weapon(2, "Bardiche ", 10)];
        const bonusWeapons = [new Weapon(3, "Flail", 25),
            new Weapon(4, "Hunga Munga", 45),
            new Weapon(5, "Arc of Robin", 5),
            new Weapon(6, "knife", 30)];
        this.players = [new Player(1, baseWeapons[0], this.board), new Player(2, baseWeapons[1], this.board)];

        for (weapon in baseWeapons) {
            baseWeapons[weapon].initializePositionOnPlayer(this.players[weapon]);
        }
        for (weapon in bonusWeapons) {
            let nbBonusWeapons = 0;
            if ((Math.random() < weaponAvailability) && (nbBonusWeapons <= maxBonusWeapons)) {
                bonusWeapons[weapon].initializePositionOnBoard(this.board);
                nbBonusWeapons += 1;
            }
        }

        this.weapons = baseWeapons.concat(bonusWeapons);

        this.currentPlayer = this.players[0];
        this.continueMovementPhase = true;

    }

    setNextPlayer() {
        if(this.currentPlayer.id === this.players.length) {
            this.currentPlayer = this.players[0];
        } else {
            this.currentPlayer = this.players[this.currentPlayer.id];
        }
    }
//-------- End of the game alert By message and the warrior id who won.-----
    endGame() {
        const winner = this.getNextPlayer().id;
        alert("Congratulations Warrior " + winner + " Won the fight!");
    }

    static makeMovementTurn(event) {
        const pos = [event.data.row, event.data.col];
        currentGame.currentPlayer.makeMovement(pos, currentGame.board);
        unsetMovementOptions();

        const weaponSwitchOptions = currentGame.currentPlayer.lastMovementCells();
        weaponSwitchOptions.forEach(function (element) {
            currentGame.switchPlayerWeapon(element, currentGame.currentPlayer);
        });

        currentGame.continueMovementPhase = currentGame.board.grid[currentGame.currentPlayer.position[0]][currentGame.currentPlayer.position[1]].triggerCombat !== true;

        currentGame.setNextPlayer();
        currentGame.nextMovementTurn();
    }

    nextMovementTurn() {
        if (this.continueMovementPhase !== true) {
            this.nextCombatTurn();
        } else {
            const movementOptions = this.board.checkPlayerMovementOptions(this.currentPlayer.position, this.currentPlayer.movement);
            if (movementOptions.length > 0) {
                setupMovementOptions(movementOptions);
            } else {
                this.endGame();
            }
        }
    }

    switchPlayerWeapon(pos, player) {
        const oldWeaponId = player.weapon.id;
        const newWeaponId = this.board.grid[pos[0]][pos[1]].weaponOnCell;
        if(newWeaponId > 0) {

            for (let i = 0; i < this.weapons.length; i += 1) {
                if(this.weapons[i].id === oldWeaponId) {
                    oldWeapon = this.weapons[i];
                } else if(this.weapons[i].id === newWeaponId) {
                    newWeapon = this.weapons[i];
                }
            }

            newWeapon.position = "player" + player.id;
            oldWeapon.position = pos;
            this.board.grid[pos[0]][pos[1]].weaponOnCell = oldWeaponId;
            player.weapon = newWeapon;

            displayWeapon(oldWeapon);
            displayWeapon(newWeapon);
        }
    }

    getNextPlayer() {
        if(this.currentPlayer.id === this.players.length) {
            return this.players[0];
        } else {
            return this.players[this.currentPlayer.id];
        }
    }

    nextCombatTurn() {
        if (this.currentPlayer.score > 0) {
            // where to add start game message
            setupCombatOptions();
        } else {
            this.endGame();
        }
    }

    static makeCombatTurn(event) {
        const option = event.data.option;
        unsetCombatOptions();
        if (option === "atk") {
            // message to attack
            const enemy = currentGame.getNextPlayer();
            currentGame.currentPlayer.defensePosture = false;
            enemy.takeDamages(currentGame.currentPlayer.weapon.damages);
            displayScore(enemy);
        } else if (option === "def") {
            // defend message
            currentGame.currentPlayer.defensePosture = true;
        }

        currentGame.setNextPlayer();
        currentGame.nextCombatTurn();
    }
}