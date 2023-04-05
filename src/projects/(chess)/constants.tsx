"use client";

const kingWhite = "./imgs/king-white.png";
const kingBlack = "./imgs/king-black.png";
const queenWhite = "./imgs/queen-white.png";
const queenBlack = "./imgs/queen-black.png";
const bishopWhite = "./imgs/bishop-white.png";
const bishopBlack = "./imgs/bishop-black.png";
const castleWhite = "./imgs/castle-white.png";
const castleBlack = "./imgs/castle-black.png";
const pawnWhite = "./imgs/pawn-white.png";
const pawnBlack = "./imgs/pawn-black.png";
const knightWhite = "./imgs/knight-white.png";
const knightBlack = "./imgs/knight-black.png";

export type PeiceWholeBoard =
    | "king-white"
    | "king-black"
    | "queen-white"
    | "queen-black"
    | "bishop-white"
    | "bishop-black"
    | "castle-white"
    | "castle-black"
    | "pawn-white"
    | "pawn-black"
    | "knight-white"
    | "knight-black";

type Peices = {
    [key in PeiceWholeBoard]: any;
};

export const pieces: Peices = {
    "king-white": kingWhite,
    "king-black": kingBlack,
    "queen-white": queenWhite,
    "queen-black": queenBlack,
    "bishop-white": bishopWhite,
    "bishop-black": bishopBlack,
    "castle-white": castleWhite,
    "castle-black": castleBlack,
    "pawn-white": pawnWhite,
    "pawn-black": pawnBlack,
    "knight-white": knightWhite,
    "knight-black": knightBlack,
};

function* generator(i: number) {
    let index = i;
    while (true) {
        index++;
        yield index % 2 === 0 ? "smoke-white" : "#a97a65";
    }
}

export const boardColors = Array.from(new Array(8), (v, i) => {
    const GEN = generator(i);
    return new Array(8).fill(null).map((_) => GEN.next().value as string);
});
