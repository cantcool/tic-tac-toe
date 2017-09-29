class TicTacToe {
    constructor() {
        this.FIELD_SIZE = 3;
        this.currentPlayer = 'x';
        this.field = [];
        this.winner = null;
        this.initField();
    }

    initField() {
        for(let row = 0; row < this.FIELD_SIZE; row++) {
            let rowArray = [];
            
            for(let col = 0; col < this.FIELD_SIZE; col++) {
                rowArray.push(null);
            }
            
            this.field.push(rowArray);
        }
    }

    isFieldEmpty(rowIndex, colIndex) {
        if(this.field[rowIndex][colIndex] === null) {
            return true;
        }
        
        return false;
    }

    changePlayer() {
        this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayer;
    }

    nextTurn(rowIndex, colIndex) {
        let player = this.getCurrentPlayerSymbol();
        
        if(this.isFieldEmpty(rowIndex, colIndex)) {
            this.setFieldValue(rowIndex, colIndex, player);
            
            if(this.checkWin(rowIndex, colIndex)) {
                this.setWinner(player);
            }

            this.changePlayer();
        }
    }

    checkWin(rowIndex, colIndex) {
        const self = this; 

        return checkHorisontal(rowIndex) || 
               checkVertical(colIndex) ||
               checkDiagonals();

        function checkHorisontal(row) {
            let lineToCheck = [];

            for(let col = 0; col < self.FIELD_SIZE; col++) {
                lineToCheck.push(self.getFieldValue(row, col));
            }

            return self.isLineOfSameValue(lineToCheck);
        }

        function checkVertical(col) {
            let lineToCheck = [];
            
            for(let row = 0; row < self.FIELD_SIZE; row++) {
                lineToCheck.push(self.getFieldValue(row, col));
            }

            return self.isLineOfSameValue(lineToCheck);
        }

        function checkDiagonals() {
            let diagTLtoBR = [],
                diagTRtoBL = [];

            for(let i = 0; i < self.FIELD_SIZE; i++) {
                diagTLtoBR.push(self.getFieldValue(i, i));
            }

            for(let i = 0; i < self.FIELD_SIZE; i++) {
                diagTRtoBL.push(self.getFieldValue(self.FIELD_SIZE - 1 - i, i));
            }

            return self.isLineOfSameValue(diagTLtoBR) ||
                   self.isLineOfSameValue(diagTRtoBL);
        }
    
    }

    isLineOfSameValue(array) {
        return array.every(item => { 
            return item !== null && item === array[0];
        });
    }

    isFinished() {
        return this.winner !== null || this.noMoreTurns();
    }

    setWinner(winner) {
        this.winner = winner;
    }

    getWinner() {
        return this.winner;
    }

    noMoreTurns() {
        for(let row = 0; row < this.FIELD_SIZE; row++) {
            
            for(let col = 0; col < this.FIELD_SIZE; col++) {
                
                if(this.getFieldValue(row, col) === null) {
                    return false;
                }
                
            }
            
        }

        return true;
    }

    isDraw() {
        return this.noMoreTurns() && this.winner === null;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.field[rowIndex][colIndex];
    }

    setFieldValue(rowIndex, colIndex, symbol) {
        if(!this.isFieldEmpty(rowIndex, colIndex)) {
            throw new Error("An unauthorized attempt to change value");
        }

        this.field[rowIndex][colIndex] = symbol;
    }

    _drawField() {
        console.log('-------------------------------');
        for(let row = 0; row < this.FIELD_SIZE; row++) {
            console.log(this.field[row]);
        }
    }
}

module.exports = TicTacToe; 
