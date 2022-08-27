class Player {
  constructor(name) {
    this.name = name;
    this.turn = true;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  endTurn(player2) {
    if (this.turn == true) {
      this.turn = false;
      player2.startTurn();
    }
  }
  startTurn() {
    if (this.turn == false) {
      this.turn = true;
    }
  }
  checkTurn() {
    return this.turn;
  }
  attack(x, y, targetPlayer, targetBoard) {
    if (this.checkTurn()) {
      targetBoard.receiveAttack(x, y);
      this.endTurn(targetPlayer);
    }
  }
}

export { Player }