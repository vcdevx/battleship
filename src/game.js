import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { Player } from "./player";
import { randomDirection, randomNumber, refreshPage } from "./helper";

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
                cell.classList.remove('shipCell')
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

const playerAttack = (gameboard, player1, player2) => {
    let gameStatus = document.querySelector('.gameStatus')
    gameStatus.textContent = "Player's Turn"

    if (player1.turn == true) {

        let aiCell = document.querySelectorAll('.aiCell')
        


        aiCell.forEach(cell => {
            cell.addEventListener('click', (e) => {
            if (!e.target.classList.contains('hitCell') && !e.target.classList.contains('missCell')) {
                let row = e.target.getAttribute('data-row')
                let col = e.target.getAttribute('data-col')
            
                aiBoard.receiveAttack(row, col)

                if (aiBoard.board[row][col] !== '' && aiBoard.board[row][col] !== 'miss') {
                    
                    aiBoard.ships[aiBoard.board[row][col].shipID].isSunk()
                }

                clearBoard('ai')
                displayBoard(aiBoard)
                if (aiBoard.checkIfLost() == true) {
                    displayWinner('Player')
                } else {
                    player.endTurn(ai)
                    gameStatus.textContent = "Enemy's Turn"
                    setTimeout(aiAttack, 1500)
                }
            }
            })
        })
    }
}

const startGame = () => {
    let startGameBtn = document.querySelector('.startBtn')
    let resetBoardBtn = document.querySelector('.resetBoardBtn')
    
    let gameStatusContainer = document.querySelector('.gameStatus')

    startGameBtn.addEventListener('click', () => {
        startGameBtn.style.display = 'none';
        resetBoardBtn.style.display = 'none';
        randomlyPlaceShips(aiBoard); 
        clearBoard('ai')
        displayBoard(aiBoard);
        player.startTurn()
        playerAttack(aiBoard, player, ai)
    })
}


const aiAttack = (row = randomNumber(10), col = randomNumber(10)) => {


    if (playerBoard.checkForNoHit(row, col) == true) {
    playerBoard.receiveAttack(row, col)
    if (playerBoard.board[row][col] !== '' && playerBoard.board[row][col] !== 'miss') {
        playerBoard.ships[playerBoard.board[row][col].shipID].isSunk()
    }
    clearBoard('player')
    displayBoard(playerBoard)
    if (playerBoard.checkIfLost() == true) {
        return displayWinner('Enemy')
    } else {
        ai.endTurn(player)
        playerAttack(aiBoard, player);
    }
    
    }
}

const clearBoard = (board) => {
    if (board == 'ai') {
    let aiBoard = document.querySelector('.aiBoardContainer')
    aiBoard.innerHTML = '';
    } else if (board == 'player') {
        let playerBoard = document.querySelector('.playerBoardContainer')
        playerBoard.innerHTML = '';
    }
}

const displayWinner = (playerName) => {
    player.turn = false;
    let gameStatusContainer = document.querySelector('.gameStatusContainer');
    let gameStatus = document.querySelector('.gameStatus')

    gameStatusContainer.style.flexDirection = 'column';
    gameStatus.textContent = `${playerName} wins!`

    let reloadGameBtn = document.createElement('button')
    reloadGameBtn.classList.add('reloadGameBtn')
    reloadGameBtn.textContent = 'Reload Game'
    gameStatusContainer.append(reloadGameBtn)

    // function to reload screen in order to reset the game
    reloadGameBtn.addEventListener('click', resetGame)
}

// Reset player's board with a button
const resetPlayerBoard = () => {
    let resetBoardBtn = document.createElement('button')
    let gameStatus = document.querySelector('.gameStatus')
    resetBoardBtn.classList.add('resetBoardBtn')
    resetBoardBtn.textContent = 'Reset Board'
    gameStatus.append(resetBoardBtn)

    let gameStatusContainer = document.querySelector('.gameStatusContainer')
    gameStatusContainer.style.flexDirection = 'row'
    

    resetBoardBtn.addEventListener('click', () => {
        clearBoard('player')
        playerBoard.clearShips()
        randomlyPlaceShips(playerBoard)
        displayBoard(playerBoard)

        // Render start game button on player's screen
        let startGameBtn = document.createElement('button')
        startGameBtn.classList.add('startBtn')
        startGameBtn.textContent = 'Start Game'
        gameStatusContainer.innerHTML = ''

        let gameStatus = document.createElement('h3')
        gameStatus.classList.add('gameStatus')
        gameStatus.textContent = ''
    
        gameStatusContainer.append(gameStatus)

        gameStatusContainer.append(resetBoardBtn)
        gameStatusContainer.append(startGameBtn)
        startGame();
    })
}

const resetGame = () => {
    let gameStatusContainer = document.querySelector('.gameStatusContainer')
    gameStatusContainer.innerHTML = ''

    let gameStatus = document.createElement('h3')
    gameStatus.classList.add('gameStatus')
    gameStatus.textContent = ''

    gameStatusContainer.append(gameStatus)


    playerBoard.clearShips()
    aiBoard.clearShips()
    resetPlayerBoard()

    clearBoard('player')
    clearBoard('ai')
    displayBoard(playerBoard)
    displayBoard(aiBoard)
}

export { displayBoard, player, ai, aiBoard, playerBoard, randomlyPlaceShips, clearBoard, startGame, aiAttack, playerAttack, resetPlayerBoard }