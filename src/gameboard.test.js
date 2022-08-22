import { Gameboard } from "./gameboard";

let gameboard = new Gameboard;

test('ship get placed', () => {
    gameboard.placeShip(2,0,1,'horizontal')
})

test('ships at row 0, col 1', () => {
    expect(gameboard.board[0][1]).toBe('ship')
})

test('ships at row 0, col 2', () => {
    expect(gameboard.board[0][2]).toBe('ship')
})

test('ships at row 0, col 3', () => {
    expect(gameboard.board[0][3]).toBe('')
})

test('ship get placed', () => {
    gameboard.placeShip(2,5,5,'vertical')
})

test('ships at row 5, col 5', () => {
    expect(gameboard.board[5][5]).toBe('ship')
})

test('ships at row 6, col 5', () => {
    expect(gameboard.board[6][5]).toBe('ship')
})

test('ships at row 7, col 5', () => {
    expect(gameboard.board[7][5]).toBe('')
})

test('ship receives attack', () => {
    gameboard.receiveAttack(6,5)
})

test('ship should be hit', () => {
    expect(gameboard.board[6][5]).toBe('hit')
})

test('ship attack misses', () => {
    gameboard.receiveAttack(7,5)
})

test('spot should be miss', () => {
    expect(gameboard.board[7][5]).toBe('miss')
})