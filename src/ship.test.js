import { Ship } from './ship';

const testShip = new Ship(2);

test('ship status length should be 2', () => {
    expect(testShip.shipStatus).toStrictEqual(["",""])
})

test('add new hit to ship', () => {
    testShip.hit(0);
})

test('run sunk ship method', () => {
    testShip.isSunk();
})

test('sunk should be set to "false"', () => {
    expect(testShip.sunk).toBe(false);
})

test('add second hit to ship', () => {
    testShip.hit(1);
})

test('run sunk ship method', () => {
    testShip.isSunk();
})

test('ship status array should be all hits', () => {
    expect(testShip.shipStatus).toStrictEqual(['hit','hit'])
})

test('sunk should be set to "true"', () => {
    expect(testShip.sunk).toBe(true);
})