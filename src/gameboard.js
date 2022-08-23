import { Ship } from "./ship";

class Gameboard {
    constructor() {
        this.board = [
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
            ['','','','','','','','','',''],
        ];
        this.ships = [];
        this.shipsRemaining = null;
    }

    placeShip(length, row, col, direction) {
        if (direction === 'vertical') {
            if (row + length > 10) {
                throw new Error('Ship is out of bounds');
            }
            // create new ship and push it into ship array
            let currentShip = new Ship(length);
            if (this.ships === []) {
                currentShip.id = 0
            } else {
                currentShip.id = this.ships.length - 1;
            }
            this.ships.push(currentShip);
            // add ship to board
            for (let i = 0; i < length; i++) {
                let ship = {'shipIndex': undefined, 'shipID': currentShip.id,}
                if (this.board[row + i][col] === '') {
                    ship.shipIndex = i;
                    this.board[row + i][col] = ship;
                } else throw new Error('Ship cannot be placed here');
            }
        }
        if (direction === 'horizontal') {
            if (col + length > 10) {
                throw new Error('Ship is out of bounds');
            }
            // create new ship and push it into ship array
            let currentShip = new Ship(length);
            this.ships.push(currentShip);
            currentShip.id = this.ships.length - 1;
            // add ship to board
            for (let i = 0; i < length; i++) {
                let ship = {'shipIndex': undefined, 'shipID': currentShip.id,}
                if (this.board[row][col + i] === '') {
                    ship.shipIndex = i;
                    this.board[row][col + i] = ship;
                } else throw new Error('Ship cannot be placed here');
            }
        }
    }

    receiveAttack(row, col) {
        if (this.board[row][col] === '') {
            this.board[row][col] = 'miss'
        } else if (this.board[row][col] != 'miss' || this.board[row][col] != '') {
            this.ships[this.board[row][col].shipID].hit(this.board[row][col].shipIndex)
        }
    }

    checkShipStatus() {
        if (this.ships.every(element => element.sunk == true)) {
            return true
        } else return false
    }
}

export { Gameboard }