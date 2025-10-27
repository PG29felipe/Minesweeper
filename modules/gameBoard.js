class GameBoard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.createBoard();
        this.mines = 50;
        this.initializeBoard();
    }

    initializeBoard() {

        let randCell = 0;

        for (let i = 0; i < this.mines; i++) {
            randCell = Math.floor(Math.random() * this.board.length);

            if (this.board[randCell] == '*') {
                i--;
                continue;
            }
            else {
                this.board[randCell] = '*';
            }
        }
  
    }

    createBoard() {
        return Array.from({ length: this.rows * this.cols }, () => '');
    }

    renderBoard(containerId, isGameOver) {
        const container = document.getElementById(containerId);

        container.innerHTML = '';
        for (let index = 0; index < this.board.length; index++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = index;

            if (this.board[index] == '*') {
                if (isGameOver) {
                    cell.dataset.isMine = true;
                    cell.innerHTML = "&#x1F4A3;";
                    cell.style.backgroundColor = "lightgrey";
                }
            }
            else if (this.board[index] == 'F1' || this.board[index] == 'F2') {
                cell.innerHTML = "&#x1F6A9;";
                cell.dataset.isFlag = true;
            }
            else if (this.board[index] == 'B') {
                cell.dataset.isMine = true;
                cell.innerHTML = "&#x1F4A3;";
                cell.style.backgroundColor = "red";
            }
            else if (this.board[index] == '0') {

                cell.dataset.isMine = false;
                cell.style.backgroundColor = "lightgrey";
                cell.dataset.isFlag = false;

            }
            else {
                cell.dataset.isMine = false;
                cell.textContent = this.board[index] || '';
            }
            container.appendChild(cell);
        }

    }

    renderFlagCounter(flagCount) {
        const container = document.getElementById("flag-counter");
        container.textContent = flagCount;
    }

    updateCell(index, value) {
        this.board[index] = value;
    }

    reset() {
        this.board = this.createBoard();
        this.initializeBoard();
    }
}

export default GameBoard;