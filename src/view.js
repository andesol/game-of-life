import { BoardModel } from './model.js'

export class BoardView {

    constructor(grid, size) {
        this.grid = grid;
        this.size = size;
        this.started = false;
        this.autoplay = false;
    }

    createGrid() {
        let fragment = document.createDocumentFragment();
        this.grid.innerHTML = '';
        this.checkboxes = [];

        for (let row = 0; row < this.size; row++) {
            let tr = document.createElement('tr');
            this.checkboxes[row] = [];
            for (let col = 0; col < this.size; col++) {
                const cell = document.createElement('td');
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                this.checkboxes[row][col] = checkbox;
                checkbox.coords = [row, col];
                cell.appendChild(checkbox);
                tr.appendChild(cell);
            }

            fragment.appendChild(tr);
        }

        this.grid.addEventListener('change', (e) => {
            if (e.target.nodeName.toLowerCase() == 'input') {
                this.started = false;
            }
        })

        this.grid.addEventListener('keyup', (e) => {
            const checkbox = e.target;

            if (checkbox.nodeName.toLowerCase() == 'input') {
                const coords = checkbox.coords;
                const row = coords[0];
                const col = coords[1];

                switch (e.keyCode) {
                    case 37:
                        if (col > 0) {
                            this.checkboxes[row][col - 1].focus();
                        }
                        break;
                    case 38:
                        if (row > 0) {

                            this.checkboxes[row - 1][col].focus();
                        }
                        break;

                    case 39:
                        if (col < this.size - 1) {
                            this.checkboxes[row][col + 1].focus();
                        }
                        break;
                    case 40:
                        if (row < this.size - 1) {

                            this.checkboxes[row + 1][col].focus();
                        }
                        break;
                }
            }
        })
        this.grid.appendChild(fragment);
    }

    get boardArray() {
        return this.checkboxes.map((row) => {
            return row.map((checkbox) => {
                return +checkbox.checked;
            });
        });
    }

    play() {
        this.game = new BoardModel(this.boardArray);
        this.started = true;
    }
    next() {

        if (!this.started || this.game) {
            this.play();
        }

        this.game.next();

        let board = this.game.board;
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.checkboxes[row][col].checked = !!board[row][col];
            }
        }
        if (this.autoplay) {
            this.timer = setTimeout(() => {
                this.next();
            }, 1000)
        }
    }
}