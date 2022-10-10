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


export type PeiceADT = 
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
    [key in PeiceADT]: any
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

export type Position = {
    x: number
    y: number
}

export type Vector = {
    dx: number
    dy: number
}

export type DirectionTest = (position: Position, vector: Vector) => boolean
export type DirectionTestParameter = (position: Position, vector: Vector, exception: () => boolean) => boolean


export type MovesADT = {
    'king':  DirectionTestParameter 
    'queen': DirectionTest
    'bishop': DirectionTest
    'castle': DirectionTestParameter
    'pawn': DirectionTestParameter
    'knight': DirectionTest
}

export type AnyPeice = 
'king' |
'queen' |
'bishop' |
'castle' |
'pawn' |
'knight' 

const isStraight = (vector: Vector): boolean => (vector.dx === 0 && vector.dy !== 0) || (vector.dy === 0 && vector.dx !== 0)

const isDiagonal = (vector: Vector): boolean => {
    let converted = positive(vector)
    return converted.dx === converted.dy
}

const toPositive = (change: number) => change < 0 ? change * -1 : change

const positive = (vector: Vector): Vector => ({
    dx: toPositive(vector.dx),
    dy: toPositive(vector.dy)
})

const pythagrous = (vector: Vector) => Math.sqrt(Math.pow(vector.dx, 2) + Math.pow(vector.dy, 2))

const varInBounds = (position: number, change: number) => {
    if(change < 0){
        return !(position + change < 0)
    }
    else {
        return position + change < 8
    }
}

const inBounds = (position: Position, vector: Vector) => varInBounds(position.x, vector.dx) &&  varInBounds(position.y, vector.dy)

export const Moves: MovesADT = {
    'king': 
        (position: Position, vector: Vector) => inBounds(position, vector) && pythagrous(vector) < Math.sqrt(2)
    ,
    'queen':  
        (position: Position, vector: Vector) => {
            if(inBounds(position, vector)){
                if(!isStraight(vector)){
                return isDiagonal(vector)
                }
                return true
            }
            return false
        }
    ,
    'bishop':
        (position: Position, vector: Vector) => inBounds(position, vector) && !isStraight(vector) && isDiagonal(vector)
    ,
    'castle': 
        (position: Position, vector: Vector) => inBounds(position, vector) && isStraight(vector) && !isDiagonal(vector)
    ,
    'pawn': 
        (position: Position, vector: Vector, exception: () => boolean) => {
            if(inBounds(position, vector)){
                if(vector.dx !== 0){
                    return exception() && isDiagonal(vector) && vector.dy > 0
                }
                return vector.dy === 1 
            }
            return false
        }
    ,
    'knight':  
        (position: Position, vector: Vector) => inBounds(position, vector) && toPositive(vector.dy) === 3 && toPositive(vector.dx) === 2
    ,
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

export const backRow: Array<AnyPeice> = ['castle', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'castle']

export const vectorAdd = (position: Position, vector: Vector): Position => ({ 
    x: position.x + vector.dx,
    y: position.y + vector.dy
})

export const posToVector = (position: Position, position2: Position) => ({
    dx: position2.x - position.x,
    dy: position2.y - position.y
})