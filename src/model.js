export class BoardModel {

    constructor(seed) {
        this.seed = seed;
        this.height = seed.length;
        this.width = seed[0].length;
        this.prevBoard = [];
        this.board = clone2DArray(seed);
    }

    next() {
        this.prevBoard = clone2DArray(this.board);

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                let neighbors = this.aliveNeighbors(this.prevBoard, row, col);
                let alive = !!this.board[row][col];

                if (alive) {
                    if (neighbors < 2 || neighbors > 3) {
                        this.board[row][col] = 0;
                    }
                } else {
                    if (neighbors === 3) {
                        this.board[row][col] = 1;
                    }
                }
            }
        }

    }

    aliveNeighbors(arr, row, col) {

        const prevRow = arr[row - 1] || [];
        const nextRow = arr[row + 1] || [];

        return [
            prevRow[col - 1], prevRow[col], prevRow[col + 1],
            arr[row][col - 1], arr[row][col + 1],
            nextRow[col - 1], nextRow[col], nextRow[col + 1],
        ].reduce((a, b) => a + +!!b, 0);

    }
}

// Copy two-level nested array
function clone2DArray(arr) {
    return [...arr].map(row => [...row]);
}

