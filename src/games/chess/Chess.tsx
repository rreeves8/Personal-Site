/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useMemo, useState } from 'react';
import useMeasure from 'react-use-measure'
import { boardColors, pieces, PeiceWholeBoard } from './constants'
import { PeiceType, ChessBoard, Peice, Move } from './chess-computer/'

const PeiceComponent = ({ peice, size }: { peice: Peice, size: number }) => {
    const [ref, { x, y }] = useMeasure()

    return (
        <div>
            <img
                style={{ opacity: 1 }}
                src={pieces[peice.getName() as PeiceWholeBoard]}
                height={`${size / 8}px`}
                width={`${size / 8}px`}
            ></img>
        </div>
    )
}

type CellProps = { 
    color: string, 
    size: number, 
    peice: Peice | ""
    tryMove: (peice: Peice | "") => boolean
}

const Cell = ({ color, size, peice, tryMove } : CellProps) => {
    const [isClicked, setClicked] = useState(false)

    const 


    useEffect(() => {
        if(isClicked){
            let result = tryMove(peice)
            if (result === undefined){
                return true
            }
            else {
                return false
            }
        }
    })

    let filter = isClicked ? { filter: "grayscale(20%)" } : { }

    return (
        <div
            style={{ backgroundColor: color, height: `${size / 8}px`, width: `${size / 8}px`, ...filter }}
            onClick={() => {
                setClicked(true)
            }}
        >
            {peice instanceof Peice ? (
                <PeiceComponent
                    peice={peice as Peice}
                    size={size}
                />
            ) : <></>}
        </div>
    )
}


export default function BoardComponent() {
    const [ref, { height }] = useMeasure()
    const [turn, setTurn] = useState<string>('white')
    const [board, setBoard] = useState<ChessBoard>(() => new ChessBoard())
    
    const [clickedPeice, setClickedPeice] = useState<Peice | undefined>()
    const [emptySpot, setEmptySpot] = useState<Move | undefined>()

    const setNextMove = (peice: Peice | "") => {
        if(clickedPeice){
            setEmptySpot(() => {
                let pos = (peice as Peice).getPosition()
                return {
                    i: pos[0],
                    j: pos[1]
                }
            })
        }
        else {
            if(peice instanceof Peice && !emptySpot) {
                setClickedPeice(peice)
            }
        }

        return false
    }


    return (
        <div ref={ref} style={{ height: '100%', width: '100%', padding: 25 / 2 }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    height: 'fit-content',
                    width: 'fit-content',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    border: '2px solid #a97a65'
                }}
            >
                {boardColors.map((row, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>

                        {row.map((color, j) => (
                            <Cell
                                tryMove={setNextMove}
                                key={j}
                                color={color}
                                peice={board.getboard()[i][j]}
                                size={height - 50}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}


