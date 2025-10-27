class GameLogic {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.gameOver = false;
        this.flagCount = gameBoard.mines;
        this.emptyCells = [];

        this.timerEl = document.getElementById('timer');
        this.startTime = null;
        this.timerInterval = null;
        this.resetEl = document.getElementById('reset-button');

    }

    makeMove(index) {
        if (this.gameOver) return;
        if (!this.startTime) {
            this.startTimer();
        }
        if (this.checkBomb(index)) {
            this.gameOver = true;
            this.gameBoard.updateCell(index, "B");
            this.resetEl.innerHTML = "&#128565;";
            this.stopTimer();
            this.gameBoard.renderBoard('minesweeper-board', this.gameOver);
            return;
        }

        this.emptyCells.push(index);

        for (let i = 0; i < this.emptyCells.length; i++) {
            this.gameBoard.updateCell(this.emptyCells[i], this.checkBombsAround(this.emptyCells[i]) + "");

        }


        this.gameBoard.renderBoard('minesweeper-board', this.gameOver);


        if (this.checkWin()) {
            this.gameOver = true;
            this.stopTimer();
            return;
        }

    }


    checkWin() {
        for (let i = 0; i < this.gameBoard.board.length; i++) {
            if (this.gameBoard.board[i] == "") {
                return false;
            }
        }
        return true;
    }

    checkBomb(index) {
        const brd = this.gameBoard.board;
        if (brd[index] == '*') {
            return true;
        }
    }

    checkBombsAround(index) {

        let counter = 0;
        let neighbourCells = [];


        //validates that the cell is not all the way to the left of the board
        if (index % this.gameBoard.cols != 0) {
            if (this.gameBoard.board[index - 1] == '*' || this.gameBoard.board[index - 1] == "F2") {
                counter++;
            }
            else if (this.gameBoard.board[index - 1] == '') {
                neighbourCells.push(index - 1);
            }
        }
        //Validates that the cell is not all the way to the left of the board and is not at the top of the board
        if (index % this.gameBoard.cols != 0 && index - this.gameBoard.cols >= 0) {
            if (this.gameBoard.board[index - (this.gameBoard.cols + 1)] == '*' || this.gameBoard.board[index - (this.gameBoard.cols + 1)] == "F2") {
                counter++;
            }
            else if (this.gameBoard.board[index - (this.gameBoard.cols + 1)] == '') {
                neighbourCells.push(index - (this.gameBoard.cols + 1));
            }
        }

        //validate that the cell is not at the top of the board
        if (index - this.gameBoard.cols >= 0) {
            if (this.gameBoard.board[index - (this.gameBoard.cols)] == '*' || this.gameBoard.board[index - (this.gameBoard.cols)] == "F2") {
                counter++;
            }
            else if (this.gameBoard.board[index - (this.gameBoard.cols)] == '') {
                neighbourCells.push(index - (this.gameBoard.cols));
            }
        }

        //Validates that the cell is not all the way to the right of the board and is not at the top of the board
        if ((index + 1) % (this.gameBoard.cols) != 0 && index - this.gameBoard.cols >= 0) {
            if (this.gameBoard.board[index - (this.gameBoard.cols - 1)] == '*' || this.gameBoard.board[index - (this.gameBoard.cols - 1)] == "F2") {
                counter++;
            }
            else if (this.gameBoard.board[index - (this.gameBoard.cols - 1)] == '') {
                neighbourCells.push(index - (this.gameBoard.cols - 1));
            }
        }

        //Validates that the cell is not all the way to the right of the board
        if ((index + 1) % (this.gameBoard.cols) != 0) {
            if (this.gameBoard.board[index + 1] == '*' || this.gameBoard.board[index + 1] == "F2") {
                counter++;
            }
            else if (this.gameBoard.board[index + 1] == '') {
                neighbourCells.push(index + 1);
            }
        }

        //Validates that the cell is not all the way to the left of the board and at the bottom of the board
        if (index % this.gameBoard.cols != 0 && index + this.gameBoard.cols <= (this.gameBoard.board.length - 1)) {
            if (this.gameBoard.board[index + (this.gameBoard.cols - 1)] == '*' || this.gameBoard.board[index + (this.gameBoard.cols - 1)] == "F2") {
                counter++;
            }
            else if (this.gameBoard.board[index + (this.gameBoard.cols - 1)] == '') {
                neighbourCells.push(index + (this.gameBoard.cols - 1));
            }
        }

        //Validates that the cell is not at the bottom of the board
        if (index + this.gameBoard.cols <= (this.gameBoard.board.length - 1)) {
            if (this.gameBoard.board[index + (this.gameBoard.cols)] == '*' || this.gameBoard.board[index + (this.gameBoard.cols)] == "F2") {
                counter++;
            }
            else if (this.gameBoard.board[index + (this.gameBoard.cols)] == '') {
                neighbourCells.push(index + (this.gameBoard.cols));
            }
        }

        //Validates that the cell is not all the way to the right of the board and at the bottom of the board
        if ((index + 1) % (this.gameBoard.cols) != 0 && index + this.gameBoard.cols <= (this.gameBoard.board.length - 1)) {
            if (this.gameBoard.board[index + (this.gameBoard.cols + 1)] == '*' || this.gameBoard.board[index + (this.gameBoard.cols + 1)] == "F2") {
                counter++;
            }
            else if (this.gameBoard.board[index + (this.gameBoard.cols + 1)] == '') {
                neighbourCells.push(index + (this.gameBoard.cols + 1));
            }
        }
        if (counter == 0) {
            for (let i = 0; i < neighbourCells.length; i++) {
                this.emptyCells.push(neighbourCells[i]);
            }
            return counter;
        }
        else {
            return counter;
        }
    }
    revealEmptyCells(emptyCells) {
        for (let i = 0; i < emptyCells.length; i++) {
            this.checkBombsAround(emptyCells[i]);
            emptyCells.pop();
        }

    }

    checkDraw() {
        return this.gameBoard.board.every(cell => cell);
    }

    reset() {
        this.flagCount = this.gameBoard.mines;
        this.gameOver = false;
        this.gameBoard.reset();
        this.emptyCells = [];
        this.startTime = null;
        this.stopTimer();
        this.resetEl.innerHTML = "&#128512;";

        if (this.timerEl) this.timerEl.textContent = "00:00";
    }

    flagCell(index) {
        if (this.gameBoard.board[index] == "F1") {
            this.gameBoard.updateCell(index, "");
            this.flagCount++;
            this.gameBoard.renderFlagCounter(this.flagCount);
        }
        else if (this.gameBoard.board[index] == "F2") {
            this.gameBoard.updateCell(index, "*");
            this.flagCount++;
            this.gameBoard.renderFlagCounter(this.flagCount);
        }
        else if (this.gameBoard.board[index] == "" && this.flagCount > 0) {

            this.gameBoard.updateCell(index, "F1");
            this.flagCount--;
            this.gameBoard.renderFlagCounter(this.flagCount);
        }
        else if (this.gameBoard.board[index] == "*" && this.flagCount > 0) {
            this.gameBoard.updateCell(index, "F2");
            this.flagCount--;
            this.gameBoard.renderFlagCounter(this.flagCount);
        }
        
        this.gameBoard.renderBoard('minesweeper-board', this.gameOver);
    }

    startTimer() {
        this.startTime = Date.now();

        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;

            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);


            const formattedTime =
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (this.timerEl) {
                this.timerEl.textContent = formattedTime;
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }
}

export default GameLogic;