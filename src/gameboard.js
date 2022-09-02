import { Ship } from "./ship";
import { randomNumber, randomDirection } from "./helper";
import { playerBoard, aiAttack } from "./game";

class Gameboard {
  constructor(name) {
    this.board = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ];
    this.ships = [];
    this.name = name;
  }

  placeShip(length, row, col, direction, shipName) {
    if (direction === "vertical") {
      if (
        row + length > 10 ||
        this.checkIfNotEmpty(length, row, col, direction) === true
      ) {
        return this.placeShip(
          length,
          randomNumber(10),
          randomNumber(10),
          randomDirection(),
          shipName
        );
      }
      // create new ship and push it into ship array
      let currentShip = new Ship(length);
      currentShip.shipName = shipName;
      if (this.ships === []) {
        currentShip.id = 0;
      } else {
        currentShip.id = this.ships.length;
      }
      this.ships.push(currentShip);
      // add ship to board
      for (let i = 0; i < length; i++) {
        let ship = { shipIndex: undefined, shipID: currentShip.id };
        if (this.board[row + i][col] === "") {
          ship.shipIndex = i;
          this.board[row + i][col] = ship;
        } else {
          throw Error("ship can not be placed here vertically");
        }
      }
    }
    if (direction === "horizontal") {
      if (
        col + length > 10 ||
        this.checkIfNotEmpty(length, row, col, direction) === true
      ) {
        return this.placeShip(
          length,
          randomNumber(10),
          randomNumber(10),
          randomDirection(),
          shipName
        );
      }
      // create new ship and push it into ship array
      let currentShip = new Ship(length);
      currentShip.shipName = shipName;
      if (this.ships === []) {
        currentShip.id = 0;
      } else {
        currentShip.id = this.ships.length;
      }
      this.ships.push(currentShip);
      // add ship to board
      for (let i = 0; i < length; i++) {
        let ship = { shipIndex: undefined, shipID: currentShip.id };
        if (this.board[row][col + i] === "") {
          ship.shipIndex = i;
          this.board[row][col + i] = ship;
        } else {
          throw Error("ship can not be placed here horizontally");
        }
      }
    }
  }

  receiveAttack(row, col) {
    if (this.board[row][col] === "") {
      this.board[row][col] = "miss";
    } else if (this.board[row][col] != "miss" || this.board[row][col] != "") {
      this.ships[this.board[row][col].shipID].hit(
        this.board[row][col].shipIndex
      );
    }
  }

  checkShipStatus() {
    if (this.ships.every((element) => element.sunk == true)) {
      return true;
    } else return false;
  }

  checkIfNotEmpty(length, row, col, direction) {
    let result = false;
    if (direction === "horizontal" && row !== undefined) {
      for (let i = 0; i < length + 1; i++) {
        if (this.board[row][col + i] !== "") {
          result = true;
          break;
        }
      }
      return result;
    }

    if (direction === "vertical") {
      let result = false;
      for (let i = 0; i < length; i++) {
        if (this.board[row + i][col] !== "") {
          result = true;
          break;
        }
      }
      return result;
    }
  }

  checkIfLost() {
    return this.ships.every((e) => e.sunk == true);
  }

  checkForNoHit(row, col) {
    if (this.board[row][col] === "") {
      return true;
    } else if (this.board[row][col] !== "miss" && this.board[row][col] !== "") {
      if (this.board[row][col] !== "miss" && this.board[row][col] === "") {
        return true;
      } else if (
        this.ships[this.board[row][col].shipID].shipStatus[
          this.board[row][col].shipIndex
        ] !== "hit"
      ) {
        return true;
      } else {
        aiAttack();
      }
    } else {
      aiAttack();
    }
  }

  clearShips() {
    this.ships = [];
    this.board = [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
      ];
  }
}

export { Gameboard };
