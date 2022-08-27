import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { Player } from "./player";
import { randomDirection, randomNumber } from "./helper";

const player = new Player('player');
const ai = new Player('ai');

const playerBoard = new Gameboard('player');
const aiBoard  = new Gameboard('ai');

const displayBoard = (gameboard) => {

    let playerBoardContainer = document.querySelector('.playerBoardContainer');
    let aiBoardContainer = document.querySelector('.aiBoardContainer');

    for (let h = 0; h < gameboard.board.length; h++) {
        for (let i = 0; i < gameboard.board[h].length; i++) {
            let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', h)
        cell.setAttribute('data-col', i)

        // change color of board based on who the player is
        if (gameboard.name == 'player') {
            cell.classList.add('playerCell');
        } else if (gameboard.name == 'ai') {
            cell.classList.add('aiCell');
        }

        if (gameboard.board[h][i] != '' && gameboard.board[h][i] != 'miss') {
            if (gameboard.ships[gameboard.board[h][i].shipID].shipStatus[gameboard.board[h][i].shipIndex] === 'hit') {
                cell.classList.add('hitCell')
            }
    
            if (gameboard.ships[gameboard.board[h][i].shipID].sunk == false) {
                cell.classList.add('shipCell')
            } else if (gameboard.ships[gameboard.board[h][i].shipID].sunk == true) {
                cell.classList.add('sunkCell')
            }
        }


        if (gameboard.board[h][i] === 'miss') {
            cell.classList.add('missCell')
        }
        
        if (gameboard.name == 'player') {
            playerBoardContainer.append(cell);
        } else if (gameboard.name == 'ai') {
            aiBoardContainer.append(cell);
        }

        }
    }
}

let randomlyPlaceShips = (gameboard) => {
    let shipNames = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"]
    let shipLengths = [5, 4, 3, 3, 2]
    for (let i = 0; i < 5; i++) {
        gameboard.placeShip(shipLengths[i], randomNumber(10), randomNumber(10), randomDirection(), shipNames[i])
    }
}

const addBoardEventListeners = (gameboard, player1, player2) => {
    if (player1.turn == true) {
        let aiCell = document.querySelectorAll('.aiCell')
        let shipCell = document.querySelector('.shipCell')
        let hitCell = document.querySelector('.hitCell')
        let missCell = document.querySelector('.missCell')


        aiCell.forEach(cell => {
            cell.addEventListener('click', (e) => {
            if (e.target.classList.contains('shipCell')) {
                let row = e.target.getAttribute('data-row')
                let col = e.target.getAttribute('data-col')
                console.log('attack')
                gameboard.receiveAttack(row, col)
                aiCell.forEach(cell => {
                    cell.removeEventListener()
                })
            }
            })
        })
    }
}

const startGame = () => {
    randomlyPlaceShips(aiBoard)


}

export { displayBoard, player, ai, aiBoard, playerBoard, randomlyPlaceShips, addBoardEventListeners }