import { playGame, displayBoard, player, playerBoard, ai, aiBoard, randomlyPlaceShips, addBoardEventListeners } from "./game";
import { Ship } from "./ship"

console.log('hi2'); 

randomlyPlaceShips(playerBoard);
console.log(playerBoard.board);
console.log(playerBoard.ships);


randomlyPlaceShips(aiBoard);
console.log(aiBoard.board);
console.log(aiBoard.ships);

displayBoard(playerBoard);
displayBoard(aiBoard);

player.startTurn();
addBoardEventListeners(aiBoard, player, ai)