import GameBoard from '../modules/gameBoard.js';
import GameLogic from '../modules/gameLogic.js';
import UserInput from '../modules/userInput.js';


class GameEngine {

    //Initializes the GameEngine
    constructor(containerId) {
        this.containerId = containerId;

        //initializes game board
        this.gameBoard = new GameBoard(15, 15);

        //uses the game board to initialize the game logic
        this.gameLogic = new GameLogic(this.gameBoard);

        //uses the game logic to initialize the user inout handler
        this.userInput = new UserInput(this.gameLogic);

        //references the "reset-button" element
        this.resetBtn = document.getElementById('reset-button');

        //renders the board for the first time
        this.gameBoard.renderBoard(this.containerId);

        //adds a listener to the "resetBtn" to listen when the reset-button is clicked
        this.resetBtn?.addEventListener('click', () => {
            //restart the game logic
            this.gameLogic.reset();
            //render the board
            this.gameBoard.renderBoard(this.containerId);
            //render the flag counter
            this.gameBoard.renderFlagCounter(this.gameBoard.mines);
        });
    }
}

export default GameEngine;