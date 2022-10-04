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

type Peices = {
    [key in Peice]: any
}

export type Peice = 
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

//North east south west
type MovesADT = {
    [key in AnyPeice]: [number, number]  
}


export type AnyPeice = 
'king' |
'queen' |
'bishop' |
'castle' |
'pawn' |
'knight' 


export const Moves: MovesADT = {
    'king': [1, 1, 1, 1],
    'queen':  [1, 1, 1, 1],
    'bishop': ,
    'castle': ,
    'pawn': ,
    'knight': ,

}