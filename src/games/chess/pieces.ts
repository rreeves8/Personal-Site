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

interface Peices {
    [key: string]: any
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