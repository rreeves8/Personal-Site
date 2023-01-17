import { Peice, createPeice, Pawn, Bishop } from "./Peice";
import { inBounds, validateMove } from "./PeiceLogic";
import { Board, PeiceADT, PeiceType, Player, peices, MoveValidator } from "./types";

const startingPos = ["castle", "knight", "bishop", "queen", "king", "bishop", "knight", "castle"];

const cloneChess = (map: Map<string, Peice>): [Board, Map<string, Peice>] => {
    let newBoard: Board = Array.from(Array(8), () => Array.from(Array(8), () => ""));
    let newMap = new Map<string, Peice>();

    for (const [key, value] of map) {
        let copy = value.clone() as Peice;
        newMap.set(key, copy);
        let pos = copy.getPosition();
        newBoard[pos[0]][pos[1]] = copy;
    }

    return [newBoard, newMap];
};

const boardAndMapAreSame = (board: Board, map: Map<string, Peice>) => {
    for (const [key, value] of map) {
        let currentPos = value.getPosition();
        if (board[currentPos[0]][currentPos[1]] !== value) {
            throw new Error("map is off");
        }
    }
    board.forEach((row) => [
        row.forEach((peice) => {
            if (peice instanceof Peice) {
                if (map.has(peice.getMapName())) {
                    if ((map.get(peice.getMapName()) as Peice) !== peice) {
                        throw new Error("map doesnt have board peice");
                    }
                } else {
                    throw new Error("map doesnt have board peice");
                }
            }
        }),
    ]);
};

export default class ChessBoard {
    private turn: Player = "white";
    private board: Board;
    private peices: Map<string, Peice> = new Map();
    private check: Peice | undefined;
    private winner?: Player;

    constructor(board?: Board) {
        const setMap = (peice: Peice) => {
            this.peices.set(peice.getMapName(), peice);
        };

        this.board = board
            ? board
            : [
                  Array.from(Array(8), (v: any, k: number) => createPeice(startingPos[k] as PeiceType, "black", 0, k, setMap)),
                  Array.from(Array(8), (v: any, k: number) => createPeice("pawn", "black", 1, k, setMap)),
                  ...Array.from(Array(4), (v: any, k: number) => new Array(8).fill("")),
                  Array.from(Array(8), (v: any, k: number) => createPeice("pawn", "white", 6, k, setMap)),
                  Array.from(Array(8), (v: any, k: number) => createPeice(startingPos[k] as PeiceType, "white", 7, k, setMap)),
              ];
    }

    getWinner() {
        if (typeof this.winner === "undefined") {
            return false;
        } else {
            return this.winner;
        }
    }

    /*
        Can you move the king to get out ? 
        Can you take the peice thats put it in check to fully resovle it ?
    */
    isCheckMate() {
        let checkedKing = this.peices.get("king-" + (this.turn === "white" ? "black" : "white")) as Peice;
        let peiceInCheck = this.check as Peice;

        let positionsX = [-1, 0, 1, 1, 1, 0, -1, -1];
        let positionsY = [1, 1, 1, 0, -1, -1, -1, 0];

        for (let count = 0; count < 8; count++) {
            let [i, j] = checkedKing.getPosition();
            let nextI = i + positionsX[count];
            let nextJ = j + positionsY[count];

            if (
                inBounds(nextI, nextJ) &&
                this.board[nextI][nextJ] instanceof Peice &&
                (this.board[nextI][nextJ] as Peice).getPlayer() !== checkedKing.getPlayer() &&
                checkedKing.getValidMoves(this.board)(i, j, nextI, nextJ)
            ) {
                if (this.resolvedCheck(i, j, nextI, nextJ)) {
                    return false;
                }
            }
        }

        for (const [key, value] of this.peices) {
            if ((value as Peice).getPlayer() !== this.turn) {
                let peiceCouldMove = value.getPosition();
                let peiceToTake = peiceInCheck.getPosition();

                if (value.getValidMoves(this.board)(peiceCouldMove[0], peiceCouldMove[1], peiceToTake[0], peiceToTake[1])) {
                    if (this.resolvedCheck(peiceCouldMove[0], peiceCouldMove[1], peiceToTake[0], peiceToTake[1])) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    isCheck(peice: Peice) {
        let opponent = this.turn === "white" ? "black" : "white";

        let king = this.peices.get("king-" + opponent) as Peice;
        let isCheck = peice.isCheck(this.board, king);

        if (isCheck) {
            //breakpoint
            console.log(isCheck);
        }
        return isCheck;
    }

    resolvedCheck(i: number, j: number, nextI: number, nextJ: number) {
        let [newBoard, newMap] = cloneChess(this.peices);
        boardAndMapAreSame(newBoard, newMap);

        let currentPeice = newBoard[i][j] as Peice;
        let positionToMove = newBoard[nextI][nextJ];
        currentPeice.updatePosition(nextI, nextJ);

        if (positionToMove instanceof Peice) {
            newMap.delete(positionToMove.getMapName());
        }

        newBoard[nextI][nextJ] = currentPeice;
        newBoard[i][j] = "";

        for (const [key, value] of newMap) {
            if ((value as Peice).getPlayer() !== this.turn) {
                if (value.getPosition()[0] === 1) {
                    console.log(value);
                }

                let isChecked = (value as Peice).isCheck(newBoard as Board, newMap.get("king-" + this.turn) as Peice);

                if (isChecked) {
                    return false;
                }
            }
        }

        return true;
    }

    makeMove(i: number, j: number, nextI: number, nextJ: number, player: Player): boolean {
        if (typeof this.winner === "undefined") {
            const checkPass = () => {
                if (this.check) {
                    if (this.resolvedCheck(i, j, nextI, nextJ)) {
                        console.log("checked");
                        this.check = undefined;
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            };

            let currentPosition = this.board[i][j];
            let nextPos = this.board[nextI][nextJ];

            if (currentPosition instanceof Peice && currentPosition.getPlayer() === player && player === this.turn) {
                let validateMove = currentPosition.getValidMoves(this.board);

                if (validateMove(i, j, nextI, nextJ)) {
                    if (nextPos instanceof Peice) {
                        if (nextPos.getPlayer() !== player) {
                            if (!checkPass()) {
                                return false;
                            }
                            this.updateBoard(i, j, nextI, nextJ);
                            return true;
                        }
                    } else {
                        if (!checkPass()) {
                            return false;
                        }
                        this.updateBoard(i, j, nextI, nextJ);
                        return true;
                    }
                }
            }

            return false;
        } else {
            return false;
        }
    }

    private updateBoard(i: number, j: number, nextI: number, nextJ: number) {
        let currentPeice = this.board[i][j] as Peice;
        let positionToMove = this.board[nextI][nextJ];

        currentPeice.updatePosition(nextI, nextJ);

        if (positionToMove instanceof Peice) {
            this.peices.delete(positionToMove.getMapName());
        }

        this.board[nextI][nextJ] = currentPeice;
        this.board[i][j] = "";

        this.check = this.isCheck(currentPeice) ? currentPeice : undefined;
        // if (this.check) {
        //     if (this.isCheckMate()) {
        //         this.winner = this.turn;
        //     }
        // }
        this.turn = this.turn === "white" ? "black" : "white";
    }

    printBoard() {
        console.table(
            this.board.map((row) => {
                return row.map((peice) => {
                    if (peice instanceof Peice) {
                        return peice.getName();
                    } else {
                        return peice;
                    }
                });
            })
        );
    }

    getboard() {
        return this.board;
    }

    getPlayerMove() {
        return this.turn;
    }
}
