class GameLogic {

    //Initialize game board
    constructor(gameBoard) {

        this.gameBoard = gameBoard;
        this.gameOver = false;
        this.flagCount = gameBoard.mines;
        this.emptyCells = [];

        //reference the timer element from the HTML
        this.timerEl = document.getElementById('timer');
        this.startTime = null;
        this.timerInterval = null;

        //reference the reset button from the HTML
        this.resetEl = document.getElementById('reset-button');

    }

    //method to make a move in the game board based on the cell clicked
    makeMove(index) {
        //if game is over, do nothing
        if (this.gameOver) return;

        //start the timer if it has not yet started
        if (!this.startTime) {
            this.startTimer();
        }

        //if the cell clicked is a bomb, the game over, updates the value of the clicked cell, changes the emoji of the reset button and renders the board.
        if (this.checkBomb(index)) {
            this.gameOver = true;
            this.gameBoard.updateCell(index, "B");
            this.resetEl.innerHTML = "&#128565;";
            this.stopTimer();
            this.gameBoard.renderBoard('minesweeper-board', this.gameOver);
            return;
        }

        //add current cell to the list of "empty cells"
        this.emptyCells.push(index);

        //this loop uses the checkBombs around to validate if there are mines around the cell if true, it returns the cell with the amount of mines around it, 
        //if false, it checks all the cell arount it to look for mines around them.
        for (let i = 0; i < this.emptyCells.length; i++) {
            this.gameBoard.updateCell(this.emptyCells[i], this.checkBombsAround(this.emptyCells[i]) + "");
        }

        //render the game board
        this.gameBoard.renderBoard('minesweeper-board', this.gameOver);

        //check if the win condition is met, if true, game is over, the timer turns green and it stops
        if (this.checkWin()) {
            this.gameOver = true;
            this.timerEl.style.color = "green";
            this.stopTimer();
            return;
        }

    }

    //this method validates that all the cells are not empty, if so, the user won.
    checkWin() {
        for (let i = 0; i < this.gameBoard.board.length; i++) {
            if (this.gameBoard.board[i] == "") {
                return false;
            }
        }
        return true;
    }

    //this method checks if the clicked cell is a bomb, if true, game is over
    checkBomb(index) {
        const brd = this.gameBoard.board;
        if (brd[index] == '*') {
            return true;
        }
    }

    //Method to validate the amount of mines around a cell
    checkBombsAround(index) {

        let counter = 0;

        //array of valid cells around an empty cell
        let neighbourCells = [];


        //validates that the cell is not all the way to the left of the board
        if (index % this.gameBoard.cols != 0) {

            //if the cell is a mine or a flagged mine, the mine counter is increased
            if (this.gameBoard.board[index - 1] == '*' || this.gameBoard.board[index - 1] == "F2") {
                counter++;
            }
            //if the current cell is empty, this is a valid cell to propagate the empty cell search to
            else if (this.gameBoard.board[index - 1] == '') {
                neighbourCells.push(index - 1);
            }
        }
        //Validates that the cell is not all the way to the left of the board and is not at the top of the board
        if (index % this.gameBoard.cols != 0 && index - this.gameBoard.cols >= 0) {
            //if the cell is a mine or a flagged mine, the mine counter is increased
            if (this.gameBoard.board[index - (this.gameBoard.cols + 1)] == '*' || this.gameBoard.board[index - (this.gameBoard.cols + 1)] == "F2") {
                counter++;
            }
            //if the current cell is empty, this is a valid cell to propagate the empty cell search to
            else if (this.gameBoard.board[index - (this.gameBoard.cols + 1)] == '') {
                neighbourCells.push(index - (this.gameBoard.cols + 1));
            }
        }

        //validate that the cell is not at the top of the board
        if (index - this.gameBoard.cols >= 0) {
            //if the cell is a mine or a flagged mine, the mine counter is increased
            if (this.gameBoard.board[index - (this.gameBoard.cols)] == '*' || this.gameBoard.board[index - (this.gameBoard.cols)] == "F2") {
                counter++;
            }
            //if the current cell is empty, this is a valid cell to propagate the empty cell search to
            else if (this.gameBoard.board[index - (this.gameBoard.cols)] == '') {
                neighbourCells.push(index - (this.gameBoard.cols));
            }
        }

        //Validates that the cell is not all the way to the right of the board and is not at the top of the board
        if ((index + 1) % (this.gameBoard.cols) != 0 && index - this.gameBoard.cols >= 0) {
            //if the cell is a mine or a flagged mine, the mine counter is increased
            if (this.gameBoard.board[index - (this.gameBoard.cols - 1)] == '*' || this.gameBoard.board[index - (this.gameBoard.cols - 1)] == "F2") {
                counter++;
            }
            //if the current cell is empty, this is a valid cell to propagate the empty cell search to
            else if (this.gameBoard.board[index - (this.gameBoard.cols - 1)] == '') {
                neighbourCells.push(index - (this.gameBoard.cols - 1));
            }
        }

        //Validates that the cell is not all the way to the right of the board
        if ((index + 1) % (this.gameBoard.cols) != 0) {
            //if the cell is a mine or a flagged mine, the mine counter is increased
            if (this.gameBoard.board[index + 1] == '*' || this.gameBoard.board[index + 1] == "F2") {
                counter++;
            }
            //if the current cell is empty, this is a valid cell to propagate the empty cell search to
            else if (this.gameBoard.board[index + 1] == '') {
                neighbourCells.push(index + 1);
            }
        }

        //Validates that the cell is not all the way to the left of the board and at the bottom of the board
        if (index % this.gameBoard.cols != 0 && index + this.gameBoard.cols <= (this.gameBoard.board.length - 1)) {
            //if the cell is a mine or a flagged mine, the mine counter is increased
            if (this.gameBoard.board[index + (this.gameBoard.cols - 1)] == '*' || this.gameBoard.board[index + (this.gameBoard.cols - 1)] == "F2") {
                counter++;
            }
            //if the current cell is empty, this is a valid cell to propagate the empty cell search to
            else if (this.gameBoard.board[index + (this.gameBoard.cols - 1)] == '') {
                neighbourCells.push(index + (this.gameBoard.cols - 1));
            }
        }

        //Validates that the cell is not at the bottom of the board
        if (index + this.gameBoard.cols <= (this.gameBoard.board.length - 1)) {
            //if the cell is a mine or a flagged mine, the mine counter is increased
            if (this.gameBoard.board[index + (this.gameBoard.cols)] == '*' || this.gameBoard.board[index + (this.gameBoard.cols)] == "F2") {
                counter++;
            }
            //if the current cell is empty, this is a valid cell to propagate the empty cell search to
            else if (this.gameBoard.board[index + (this.gameBoard.cols)] == '') {
                neighbourCells.push(index + (this.gameBoard.cols));
            }
        }

        //Validates that the cell is not all the way to the right of the board and at the bottom of the board
        if ((index + 1) % (this.gameBoard.cols) != 0 && index + this.gameBoard.cols <= (this.gameBoard.board.length - 1)) {
            //if the cell is a mine or a flagged mine, the mine counter is increased
            if (this.gameBoard.board[index + (this.gameBoard.cols + 1)] == '*' || this.gameBoard.board[index + (this.gameBoard.cols + 1)] == "F2") {
                counter++;
            }
            //if the current cell is empty, this is a valid cell to propagate the empty cell search to
            else if (this.gameBoard.board[index + (this.gameBoard.cols + 1)] == '') {
                neighbourCells.push(index + (this.gameBoard.cols + 1));
            }
        }

        //if the counter is 0 it means the cell has no mines around it
        if (counter == 0) {

            //add the valid neighbour cells to the list of cells to propagate the empty cell search to
            for (let i = 0; i < neighbourCells.length; i++) {
                this.emptyCells.push(neighbourCells[i]);
            }
            return counter;
        }
        //if the counter is greater than 0, return the amount of mines around the cell 
        else {
            return counter;
        }
    }

    //this method resets the game logic
    reset() {

        //flag count back to the amount of mines the board has 
        this.flagCount = this.gameBoard.mines;

        //game over is back to false
        this.gameOver = false;
        //resets the game board
        this.gameBoard.reset();
        //clars the list of empty cells to check
        this.emptyCells = [];
        //start time is null
        this.startTime = null;
        //stop the timer
        this.stopTimer();
        //assign the happy face emoji to the reset button
        this.resetEl.innerHTML = "&#128512;";
        //the timer tuns black again
        this.timerEl.style.color = "black";
        //reset the text of the timer HTML element
        if (this.timerEl) this.timerEl.textContent = "00:00";
    }

    //logic to flag cells
    flagCell(index) {

        //F1 = flagged empty cell
        //F2 = flagged mine"

        //if the cell is already flagged with F1, remove the flag and assign empty
        if (this.gameBoard.board[index] == "F1") {
            this.gameBoard.updateCell(index, "");
            //increment the flag counter
            this.flagCount++;
            this.gameBoard.renderFlagCounter(this.flagCount);
        }
        //if the cell is already flagged with F2, remove the flag and assign "*"
        else if (this.gameBoard.board[index] == "F2") {
            this.gameBoard.updateCell(index, "*");
            //increment the flag counter
            this.flagCount++;
            this.gameBoard.renderFlagCounter(this.flagCount);
        }
        //if the cell is empty and the flag counter is not 0, flag the current cell with F1
        else if (this.gameBoard.board[index] == "" && this.flagCount > 0) {

            this.gameBoard.updateCell(index, "F1");
            //decrement the flag counter
            this.flagCount--;
            this.gameBoard.renderFlagCounter(this.flagCount);
        }
        //if the cell is a mine "*" and the flag counter is not 0, flag the current cell with F2
        else if (this.gameBoard.board[index] == "*" && this.flagCount > 0) {
            this.gameBoard.updateCell(index, "F2");
            //decrement the flag counter
            this.flagCount--;
            this.gameBoard.renderFlagCounter(this.flagCount);
        }
        //render the game board
        this.gameBoard.renderBoard('minesweeper-board', this.gameOver);
    }

    //method to set the tomer
    startTimer() {

        //store the time the first time the method is called
        this.startTime = Date.now();

        //runs every second
        this.timerInterval = setInterval(() => {

            //calculates the time elapsed since the first time the startTime() method is called
            let elapsed = Date.now() - this.startTime;

            //calculate the amount of mitues elapsed. 60000 miliseconds = 1 minute
            let minutes = Math.floor(elapsed / 60000);

            //calculate the amount of seconds elapsed.
            let seconds = Math.floor((elapsed % 60000) / 1000);

            //format the timer by parsing it to string and then adding a pad of 0 if needed and only rendering two digits of the minutes and the seconds
            let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            //if the timer element exists, assign the formated time to its text content
            if (this.timerEl) {
                this.timerEl.textContent = formattedTime;
            }
        }, 1000);
    }

    //logic to stop the timer
    stopTimer() {

        //The clearInterval() method clears a timer set with the setInterval() method.
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }
}

//export the GameLogic as a module
export default GameLogic;