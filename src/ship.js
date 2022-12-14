class Ship {
    constructor(num, shipName) {
        this.length = num;
        this.sunk = false;
        this.shipStatus = Array(num).fill("");
        this.shipName = shipName;
    }

    hit(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Invalid index');
        }
        if (this.shipStatus[index] === '') {
            this.shipStatus[index] = 'hit'
        }
    }

    isSunk() {
        if (this.shipStatus.every(hit => hit === 'hit') === true) {
            this.sunk = true;
        }
    }
}

export { Ship }