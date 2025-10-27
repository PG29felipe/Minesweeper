class GameBoard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.createBoard();
        this.mines = 50;
        this.initializeBoard();
    }

    //Method to initialize board with mines placed randomly
    initializeBoard() {

        let randCell = 0;

        for (let i = 0; i < this.mines; i++) {
            randCell = Math.floor(Math.random() * this.board.length);

            //if cell already has mine, look for another cell
            if (this.board[randCell] == '*') {
                i--;
                continue;
            }
            else {
                this.board[randCell] = '*';
            }
        }
  
    }

    //Initialize empty array (board) 
    createBoard() {
        return Array.from({ length: this.rows * this.cols }, () => '');
    }

    //this method renders the board after every move
    renderBoard(containerId, isGameOver) {

        //get the minesweeper container
        const container = document.getElementById(containerId);
        //empty the content of the container
        container.innerHTML = '';

        //loop over every position of the board array
        for (let index = 0; index < this.board.length; index++) {

            //creates a div inside the container that represents a new cell
            const cell = document.createElement('div');

            //adds class "cell" to the cell div
            cell.classList.add('cell');

            //add information of the index to the cell 
            cell.dataset.index = index;

            //if the cell contains a "*" (mine) and the game is over, shows all the mines in the board
            if (this.board[index] == '*') {
                if (isGameOver) {
                    cell.dataset.isMine = true;
                    //show bomb emoji in the cell
                    cell.innerHTML = "&#x1F4A3;";
                    cell.style.backgroundColor = "lightgrey";
                }
            }

            // F1 = flagged empty cell
            // F2 = flagged bomb
            //this block renders a flag emoji
            else if (this.board[index] == 'F1' || this.board[index] == 'F2') {
                cell.innerHTML = "&#x1F6A9;";
                cell.dataset.isFlag = true;
            }
            //B = bomb (or mine ;P)
            //this block renders the clicked mine with a red background

            else if (this.board[index] == 'B') {
                cell.dataset.isMine = true;
                //renders the bomb emoji in the clicked cell
                cell.innerHTML = "&#x1F4A3;";
                cell.style.backgroundColor = "red";
            }
            
            //this block renders cells with no mines around them with a grey background
            else if (this.board[index] == '0') {

                cell.dataset.isMine = false;
                cell.style.backgroundColor = "lightgrey";
                cell.dataset.isFlag = false;

            }

            //render all the rest of the cells (empty or with numbers)
            else {
                cell.dataset.isMine = false;
                cell.textContent = this.board[index] || '';
            }
            //adds the cell to the minesweeper container
            container.appendChild(cell);
        }

    }

    //Method to render all the flags in the board
    renderFlagCounter(flagCount) {
        const container = document.getElementById("flag-counter");
        container.textContent = flagCount;
    }

    //method to update the value of the cell
    updateCell(index, value) {
        this.board[index] = value;
    }

    //method to reset the game
    reset() {
        this.board = this.createBoard();
        this.initializeBoard();
    }
}

//export the GameBoard as a module
export default GameBoard;