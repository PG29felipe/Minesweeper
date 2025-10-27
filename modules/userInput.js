class UserInput {
    constructor(gameLogic) {
        this.gameLogic = gameLogic;

        this.boundHandler = this.handleClick.bind(this);
        this.boundHandlerRC = this.handleRightClick.bind(this);


        this.addEventListeners();
    }

    //method to add listener to the "minesweeper-board" container to listen for right or left clicks
    addEventListeners() {
        const container = document.getElementById('minesweeper-board');
        container?.addEventListener('contextmenu', this.boundHandlerRC);
        container?.addEventListener('click', this.boundHandler);
    }

    //method to handle left clicks
    handleClick(event) {

        //finds the closest cell to the click
        const cell = event.target.closest('.cell');
        //if no cell found, do nothing
        if (!cell) return;

        //if the cell is flagged, ignor event and do nothing
        if (cell.dataset.isFlag) return;

        //return the index of the cell as an integer
        const index = parseInt(cell.dataset.index, 10);

        //determine the cell "index" in the game logic
        this.gameLogic.makeMove(index);
    }

    //method to handle right click
    handleRightClick(event) {

        //prevents context menu to open when right clicking inside the "minesweeper-board" container
        event.preventDefault();
        //finds the closest cell to the click
        const cell = event.target.closest('.cell');
        //if no cell found, do nothing
        if (!cell) return;
        //return the index of the cell as an integer
        const index = parseInt(cell.dataset.index, 10);
        //add a flag to the cell "index"
        this.gameLogic.flagCell(index);
    }
}

//export "UserInput" as module
export default UserInput;