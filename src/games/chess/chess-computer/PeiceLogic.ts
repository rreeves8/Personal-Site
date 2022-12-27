import { Peice } from "./Peice";
import { Board, Vector } from "./types";

export const validateMove = (board: Board, i: number, j: number, nextI: number, nextJ: number) => {
    return inBounds(nextI, nextJ) && !peiceInTheWay(board, i, j, nextI, nextJ)
};

export const peiceInTheWay = (board: Board, i: number, j: number, nextI: number, nextJ: number) => {
    let vector = toVector(i, j, nextI, nextJ);
    let magnitude = positive(vector)
    const inc = (value: number, amount: number) => value + amount
    const dec = (value: number, amount: number) => value - amount

    const determine = {
        dxFunction: isPositive(vector.dx) ? inc : dec,
        dyFunction: isPositive(vector.dy) ? inc : dec,
    }

    let counters = {
        ii: determine.dxFunction(i, magnitude.dx),
        get currentI() {
            return this.ii
        },
        set currentI(counter: number){
            let oldII = this.ii
            this.ii = determine.dxFunction(oldII, counter)
        },

        jj: determine.dyFunction(j, magnitude.dy),
        get currentJ() {
            return this.jj
        },
        set currentJ(counter: number){
            let oldJJ = this.jj
            this.jj = determine.dyFunction(oldJJ, counter)
        }
    }

    for (let counter = 0; counter < magnitude.dx - 1; counter++) {
        if (board[counters.currentI][counters.currentJ] instanceof Peice) {
            return true;
        }
        counters.currentI = counter
        counters.currentJ = counter
    }

    return false;
};

export const inBounds = (nextI: number, nextJ: number) => {
    if (nextI > 7 || nextI < 0) {
        return false;
    }
    if (nextJ > 7 || nextI < 0) {
        return false;
    }
    return true;
};

export const toVector = (i: number, j: number, nextI: number, nextJ: number): Vector => {
    return {
        dx: nextI - i,
        dy: nextJ - j,
    };
};

export const isStraight = (vector: Vector): boolean => (vector.dx === 0 && vector.dy !== 0) || (vector.dy === 0 && vector.dx !== 0);
export const isDiagonal = (vector: Vector): boolean => {
    let converted = positive(vector);
    return converted.dx === converted.dy;
};

const isPositive = (change: number) => (change > 0);

export const toPositive = (change: number) => (change < 0 ? change * -1 : change);

export const positive = (vector: Vector): Vector => ({
    dx: toPositive(vector.dx),
    dy: toPositive(vector.dy),
});

export const pythagrous = (vector: Vector) => Math.sqrt(Math.pow(vector.dx, 2) + Math.pow(vector.dy, 2));