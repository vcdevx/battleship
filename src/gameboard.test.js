import { Gameboard } from "./gameboard";

let gameboard = new Gameboard;

test('ship get placed', () => {
    gameboard.placeShip(2,0,1,'horizontal')
})

test('ships at row 0, col 1', () => {
    expect(gameboard.board[0][1]).toStrictEqual({'shipIndex': 0, 'shipID': 0})
})

test('ships at row 0, col 2', () => {
    expect(gameboard.board[0][2]).toStrictEqual({'shipIndex': 1, 'shipID': 0})
})

test('receieve attack on second index of ship', () => {
    gameboard.receiveAttack(0, 2);
})

test('receieve attack on first index of ship', () => {
    gameboard.receiveAttack(0, 1);
})

test('check if ship sank', () => {
    gameboard.ships[0].isSunk();
})

test('check ship status to be true', () => {
    expect(gameboard.checkShipStatus()).toStrictEqual(true);
})

test('check if hit registered on second index of ship', () => {
    expect(gameboard.ships).toBe('hit');
})

