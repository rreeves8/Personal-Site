import { Peice, createPeice, Pawn } from "./Peice";
import { validateMove } from "./PeiceLogic";
import { Board, PeiceADT, PeiceType, Player, peices } from "./types";

const startingPos = ["castle", "knight", "bishop", "queen", "king", "bishop", "knight", "castle"];

export default class ChessBoard {
    private turn: Player = "black";
    private board: Board;
    private peices: Map<string, Peice> = new Map()
    private check: boolean;

    constructor(board?: Board) {
        const setMap = (key: string, peice: Peice) => {
            this.peices.set(key, peice)
        }

        this.board = board ? board : [
            Array.from(Array(8), (v: any, k: number) => createPeice(startingPos[k] as PeiceType, "black", 0, k, setMap)),
            Array.from(Array(8), (v: any, k: number) => createPeice("pawn", "black", 1, k, setMap)),
            ...Array.from(Array(4), (v: any, k: number) => new Array(8).fill("")),
            Array.from(Array(8), (v: any, k: number) => createPeice("pawn", "white", 6, k, setMap)),
            Array.from(Array(8), (v: any, k: number) => createPeice(startingPos[k] as PeiceType, "white", 7, k, setMap)),
        ];
        this.check = false
    }

    isCheck() {
        let king = this.peices.get('king-' + (this.turn === 'white' ? 'black' : 'white')) as Peice

        for (const [key, value] of this.peices) {
            if(value.getPlayer() === this.turn){
                console.log('checking check for ', value.getName())
                let checkStatus = value.isCheck(this.board, king)
  
                if (checkStatus) {
                    return true
                }
            }
        }
        return false
    }

    resolvedCheck(i: number, j: number, nextI: number, nextJ: number) {
        (this.board[i][j] as Peice).updatePosition(nextI, nextJ)

        let check = this.isCheck();

        (this.board[i][j] as Peice).updatePosition(i, j)

        return !check
    }

    makeMove(i: number, j: number, nextI: number, nextJ: number, player: Player): boolean {
        let currentPosition = this.board[i][j];
        let nextPos = this.board[nextI][nextJ];

        if (currentPosition instanceof Peice && currentPosition.getPlayer() === player && player === this.turn) {
            let validateMove = currentPosition.getValidMoves(this.board);

            if (this.check) {
                if (!this.resolvedCheck(i, j, nextI, nextJ)) {
                    return false
                }
            }
            
            if (validateMove(i, j, nextI, nextJ)) {
                if (nextPos instanceof Peice) {
                    if (nextPos.getPlayer() !== player) {
                        this.updateBoard(i, j, nextI, nextJ);
                        return true
                    }
                } else {
                    this.updateBoard(i, j, nextI, nextJ);
                    return true
                }
            }
        }

        return false;
    }


    private updateBoard(i: number, j: number, nextI: number, nextJ: number) {
        let newValue = this.board[i][j]
        let oldValue = this.board[nextI][nextJ];

        if (newValue instanceof Peice) {
            newValue.updatePosition(nextI, nextJ);
        }

        if (oldValue instanceof Peice) {
            if (this.peices.has(oldValue.getName())) {
                this.peices.delete(oldValue.getName())
            }
        }

        this.board[nextI][nextJ] = newValue;
        this.board[i][j] = "";

        this.check = this.isCheck()
        this.turn = this.turn === 'white' ? 'black' : 'white'
    }

    printBoard() {
        console.table(
            this.board.map((row) => {
                return row.map((peice) => {
                    if (peice instanceof Peice) {
                        return peice.getName()
                    } else {
                        return peice;
                    }
                });
            })
        );
    }

    getboard() {
        return this.board
    }
}
