//greasy

import kingWhite from '../../imgs/king-white.png'
import kingBlack from '../../imgs/king-black.png'
import queenWhite from '../../imgs/queen-white.png'
import queenBlack from '../../imgs/queen-black.png'
import bishopWhite from '../../imgs/bishop-white.png'
import bishopBlack from '../../imgs/bishop-black.png'
import castleWhite from '../../imgs/castle-white.png'
import castleBlack from '../../imgs/castle-black.png'
import pawnWhite from '../../imgs/pawn-white.png'
import pawnBlack from '../../imgs/pawn-black.png'
import knightWhite from '../../imgs/knight-white.png'
import knightBlack from '../../imgs/knight-black.png'


export type PeiceWholeBoard = 
'king-white' |
'king-black' |
'queen-white' |
'queen-black' |
'bishop-white' |
'bishop-black' |
'castle-white' |
'castle-black' |
'pawn-white' |
'pawn-black' |
'knight-white' |
'knight-black' 

type Peices = {
    [key in PeiceWholeBoard]: any
}

export const pieces: Peices = {
    'king-white': kingWhite,
    'king-black': kingBlack,
    'queen-white':  queenWhite,
    'queen-black': queenBlack,
    'bishop-white': bishopWhite,
    'bishop-black': bishopBlack,
    'castle-white': castleWhite,
    'castle-black':  castleBlack,
    'pawn-white': pawnWhite,
    'pawn-black': pawnBlack,
    'knight-white': knightWhite,
    'knight-black': knightBlack    
}


function* generator(i: number) {
    let index = i
    while (true) {
        index++;
        yield index % 2 === 0 ? 'smoke-white' : '#a97a65'
    }
}

export const boardColors = Array.from(new Array(8), (v, i) => {
    const GEN = generator(i)
    return new Array(8).fill(null).map(_ => GEN.next().value as string)
})