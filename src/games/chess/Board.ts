import { DirectionTestParameter, DirectionTest, PeiceADT, Moves, AnyPeice, Position, Vector, backRow, vectorAdd } from "./constants"
import equal from 'deep-equal'

interface PositonChange {
    old: Position
    new: Position
}


export class Peice {
    peice: PeiceADT
    position: Position
  
    constructor(type: PeiceADT, position: Position){
        this.position = position
        this.peice = type
    }
}

class RegularPeice extends Peice {
    moveTest: DirectionTest
    
    constructor(type: PeiceADT, position: Position){
        super(type, position)
        this.moveTest = Moves[type.split('-')[0] as AnyPeice] as DirectionTest
    }

    getValidMove(vector: Vector){
        return this.moveTest(this.position, vector)
    }
}

class PeiceException extends Peice {
    moveTest: DirectionTestParameter

    constructor(type: PeiceADT,position: Position){
        super(type, position)
        this.moveTest = Moves[type.split('-')[0] as AnyPeice] as DirectionTestParameter
    }

    getValidMove(vector: Vector, exception: () => boolean){
        return this.moveTest(this.position, vector, exception)
    }
}


const peiceBuilder = (peice: PeiceADT, position: Position): Peice => {
    if(peice.split('-')[0] === 'pawn'){
        return new PeiceException(peice, position)
    }
    else{
        return new RegularPeice(peice, position)
    }
}

export type BoardADT = Array<Array<Peice | undefined>>

export default class Board {
    board: BoardADT
    
    constructor(){
        this.board = [
            Array.from(new Array(8), (_, i) => peiceBuilder('pawn-black', { x: i, y: 7 })), 
            Array.from(new Array(8), (_, i) => peiceBuilder(backRow[i] + '-black' as PeiceADT, { x: i, y: 6 })),
            ...Array.from(new Array(4) , () => new Array(8).fill(undefined)),
            Array.from(new Array(8), (_, i) => peiceBuilder('pawn-white', { y: 1, x: i})), 
            Array.from(new Array(8), (_, i) => peiceBuilder(backRow[i]+ '-white' as PeiceADT, { y: 0, x: i}))
        ]

        this.emitBoardChange()
    }

    emitBoardChange(){
        window.dispatchEvent(new CustomEvent('board-change', {}))
    }

    getPeice(position: Position){
        return this.board[position.x][position.y]
    }

    setPeice(position: Position, peice: Peice){
        return this.board[position.x][position.y] = peice
    }

    adjustBoard(position1: Position, position2: Position){
        let oldPeice = this.getPeice(position1)
        this.setPeice(position1, this.getPeice(position2) as Peice) 
        this.setPeice(position2, oldPeice as Peice)

        this.emitBoardChange()
    }
}