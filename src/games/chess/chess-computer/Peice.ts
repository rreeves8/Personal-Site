import { inBounds, isDiagonal, isStraight, peiceInTheWay, positive, pythagrous, toPositive, toVector, validateMove } from "./PeiceLogic";
import { PeiceType, PeiceADT, Player, Board, Move, MoveValidator } from "./types";

export class Peice implements PeiceADT {
    private player: Player;
    private cost: number;
    private i: number;
    private j: number;

    constructor(player: Player, cost: number, i: number, j: number) {
        this.player = player;
        this.cost = cost;
        this.i = i;
        this.j = j;
    }

    getCost() {
        return this.cost as number;
    }

    getPlayer() {
        return this.player;
    }

    getName(): string {
        return this.constructor.name.toLowerCase() + "-" + this.getPlayer();
    }

    getType(): PeiceType {
        return this.constructor.name.toLowerCase() as PeiceType
    }

    getValidMoves(board: Board): MoveValidator {
        throw new Error("not implemented");
    }

    isCheck(board: Board, king: Peice): boolean {
        console.log(this.player)
        if (this.player === king.player || this.getType() === 'king') {
            return false
        }
        else {
            let moveValidator = this.getValidMoves(board)
            let kingPositions = king.getPosition()

            return moveValidator(this.i, this.j, kingPositions[0], kingPositions[1])
        }
    }

    updatePosition(i: number, j: number) {
        this.i = i;
        this.j = j;
    }

    getPosition() {
        return [this.i, this.j]
    }
}

export class Pawn extends Peice {
    private hasMoved = false;

    override getValidMoves(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let nextSpot = board[nextI][nextJ]
            let vector = toVector(i, j, nextI, nextJ);
            let magnitude = positive(vector);

            let directionVector = (nextSpot instanceof Peice) ? (
                magnitude.dx === magnitude.dy
            ) : isStraight(vector)

            let direction = this.getPlayer() === "white" ? vector.dx < 0 : vector.dx > 0;
            let distance = this.hasMoved ? magnitude.dx === 1 : magnitude.dx === 1 || magnitude.dx === 2;
            this.hasMoved = true;

            return validateMove(board, i, j, nextI, nextJ) && directionVector && direction && distance;
        };
    }
}

export class Knight extends Peice {
    override getValidMoves(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let vector = toVector(i, j, nextI, nextJ);
            let magnitude = positive(vector);

            let up = magnitude.dx === 2 && magnitude.dy === 1;
            let down = magnitude.dx === 1 && magnitude.dy === 2;

            return inBounds(nextI, nextJ) && (up || down);
        };
    }
}

export class Castle extends Peice {
    override getValidMoves(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let vector = toVector(i, j, nextI, nextJ);

            return validateMove(board, i, j, nextI, nextJ) && isStraight(vector) && !isDiagonal(vector);
        };
    }
}

export class Bishop extends Peice {
    override getValidMoves(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let vector = toVector(i, j, nextI, nextJ);
            return validateMove(board, i, j, nextI, nextJ) && !isStraight(vector) && isDiagonal(vector);
        };
    }
}

export class Queen extends Peice {
    override getValidMoves(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            console.log(validateMove(board, i, j, nextI, nextJ))
            return validateMove(board, i, j, nextI, nextJ);
        };
    }
}

export class King extends Peice {
    override getValidMoves(board: Board): MoveValidator {
        return (i: number, j: number, nextI: number, nextJ: number) => {
            let vector = toVector(i, j, nextI, nextJ);

            return validateMove(board, i, j, nextI, nextJ) && pythagrous(vector) < Math.sqrt(2);
        };
    }
}

// const PeiceDirections: Map<PeiceADT, MoveValidator> = new Map()
//     .set("castle", (i: number, j: number, nextI: number, nextJ: number) => {
//         let vector = toVector(i, j, nextI, nextJ);
//         return inBounds(nextI, nextJ) && isStraight(vector) && !isDiagonal(vector);
//     })
//     .set("knight", (i: number, j: number, nextI: number, nextJ: number) => {
//         let vector = toVector(i, j, nextI, nextJ);

//         let up = toPositive(vector.dy) === 3 && toPositive(vector.dx) === 2;
//         let down = toPositive(vector.dy) === 2 && toPositive(vector.dx) === 3;

//         return inBounds(nextI, nextJ) && up && down;
//     })
//     .set("bishop", (i: number, j: number, nextI: number, nextJ: number) => {
//         let vector = toVector(i, j, nextI, nextJ);

//         return inBounds(nextI, nextJ) && !isStraight(vector) && isDiagonal(vector);
//     })
//     .set("queen", () => true)
//     .set("king", (i: number, j: number, nextI: number, nextJ: number) => {
//         let vector = toVector(i, j, nextI, nextJ);

//         return inBounds(nextI, nextJ) && pythagrous(vector) < Math.sqrt(2);
//     })
//     .set("pawn", (i: number, j: number, nextI: number, nextJ: number, special: Array<boolean>) => {});

const PeiceCost: Map<PeiceType, number> = new Map()
    .set("castle", 50)
    .set("knight", 30)
    .set("bishop", 30)
    .set("queen", 90)
    .set("king", 900)
    .set("pawn", 10);

const peiceLookUp: Map<PeiceType, typeof Peice> = new Map<PeiceType, typeof Peice>()
    .set("pawn", Pawn)
    .set("knight", Knight)
    .set("castle", Castle)
    .set("bishop", Bishop)
    .set("queen", Queen)
    .set("king", King);

export const createPeice = (peiceType: PeiceType, player: Player, i: number, j: number, callBack: (string: string, peice: Peice) => void): Peice => {
    let newPeice = new (peiceLookUp.get(peiceType) as typeof Peice)(player, PeiceCost.get(peiceType) as number, i, j);

    callBack(newPeice.getName(), newPeice)
    return newPeice
}

