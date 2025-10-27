class UserInput {
    constructor(gameLogic) {
        this.gameLogic = gameLogic;

        this.boundHandler = this.handleClick.bind(this);
        this.boundHandlerRC = this.handleRightClick.bind(this);


        this.addEventListeners();
    }

    addEventListeners() {
        const container = document.getElementById('minesweeper-board');
        container?.addEventListener('contextmenu', this.boundHandlerRC);
        container?.addEventListener('click', this.boundHandler);
    }

    handleClick(event) {
        const cell = event.target.closest('.cell');
        if (!cell) return;
        if (cell.dataset.isFlag) return;
        const index = parseInt(cell.dataset.index, 10);
        this.gameLogic.makeMove(index);
    }
    handleRightClick(event) {
        event.preventDefault();
        const cell = event.target.closest('.cell');
        if (!cell) return;
        const index = parseInt(cell.dataset.index, 10);
        this.gameLogic.flagCell(index);
    }
}

export default UserInput;