import { playGame, displayBoard, player, playerBoard, ai, aiBoard, randomlyPlaceShips, startGame, resetPlayerBoard } from "./game";
import { Ship } from "./ship"

resetPlayerBoard();
displayBoard(playerBoard);
displayBoard(aiBoard)