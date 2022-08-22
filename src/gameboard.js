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
    }

    shipsRemaining = 8;
    ships = [];
    
    placeShip(length, row, col, direction) {
        if (direction === 'vertical') {
            if (row + length > 10) {
                throw new Error('Ship is out of bounds');
            }
            for (let i = 0; i < length; i++) {
                if (this.board[row + i][col] === '') {
                this.board[row + i][col] = 'ship';
                } else throw new Error('Ship cannot be placed here');
            }
        }
        if (direction === 'horizontal') {
            if (col + length > 10) {
                throw new Error('Ship is out of bounds');
            }
            for (let i = 0; i < length; i++) {
                if (this.board[row][col + i] === '') {
                this.board[row][col + i] = 'ship';
                } else throw new Error('Ship cannot be placed here');
            }
        }
    }

    receiveAttack(row, col) {
        switch (this.board[row][col]) {
            case '':
                this.board[row][col] = 'miss';
                break;
            case 'ship':
                this.board[row][col] = 'hit';
                break;
        }
    }
}

export { Gameboard }