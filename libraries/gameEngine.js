import GameBoard from '../modules/gameBoard.js';
import GameLogic from '../modules/gameLogic.js';
import UserInput from '../modules/userInput.js';


class GameEngine {
    constructor(containerId) {
        this.containerId = containerId;

        this.gameBoard = new GameBoard(15, 15);
        this.gameLogic = new GameLogic(this.gameBoard);
        this.userInput = new UserInput(this.gameLogic);

        this.resetBtn = document.getElementById('reset-button');

        this.gameBoard.renderBoard(this.containerId);

        this.resetBtn?.addEventListener('click', () => {
            this.gameLogic.reset();
            this.gameBoard.renderBoard(this.containerId);
            this.gameBoard.renderFlagCounter(this.gameBoard.mines);
        });
    }

    resetGame() {
        this.gameBoard.renderBoard(this.containerId);
    }
}

export default GameEngine;