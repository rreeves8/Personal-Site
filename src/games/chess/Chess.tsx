import { useEffect, useMemo, useState } from 'react';
import useMeasure from 'react-use-measure'
import { boardColors, PeiceADT, pieces, Position } from './constants'
import Board, { BoardADT, Peice } from './Board';
import { Observable } from 'object-observer';

const PeiceComponent = ({ peice, size }: { peice: Peice, size: number }) => {
    const [ref, { x, y }] = useMeasure()

    const emitHolding = (peice: Peice | undefined) => {
        setTimeout(() => window.dispatchEvent(new CustomEvent('dropped-peice', { detail: { peice } })))
    }

    return (
        <div>
            <img
                style={{ opacity: 1 }}
                src={pieces[peice.peice]}
                height={`${size / 8}px`}
                width={`${size / 8}px`}
                onDrag={(event) => {
                    event.preventDefault();
                }}
                onDragEnd={(e) => {
                    console.log('endinging')
                    emitHolding(peice)
                }}
            ></img>
        </div>
    )
}

type CellProps = { 
    color: string, 
    size: number, 
    peice: Peice | Position 
    tryMove: (spot: Peice | Position, movingPeice: Peice) => void
}


const Cell = ({ color, size, peice, tryMove } : CellProps) => {
    const [droppedOn, setDroppedOn] = useState<boolean>(false)

    useEffect(() => {
        const droppedListener = (event: Event) => {
            if (droppedOn) {
                tryMove(peice, event.detail.peice.position)
                setDroppedOn(false)
            }
        }

        window.addEventListener('dropped-peice', droppedListener)

        return () => window.removeEventListener('dropped-peice', droppedListener)

    }, [droppedOn])

    return (
        <div
            style={{ backgroundColor: color, height: `${size / 8}px`, width: `${size / 8}px` }}

            onDrop={(event) => {
                setDroppedOn(true)
            }}
            onDragOver={(event) => {
                event.preventDefault();
            }}
        >
            {peice !== undefined ? (
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
    const [boardHandler] = useState<Board>(() => new Board())
    const [board, setBoard] = useState<BoardADT>(boardHandler.board)
    const [holding, setHolding] = useState<Peice | undefined>()

    const tryMove = (spot: Peice | Position, movingPeice: Peice) => {
        if(spot === undefined){
            boardHandler.adjustBoard()
        }
    }


    useEffect(() => {
        const listeners = {
            'board-change': (event: Event) => {
                console.log('emitted')
                setBoard(boardHandler.board)
            },
            'holding-peice': (event: Event) => {
                console.log('root got holding', event.detail.status)
                setHolding(() => event.detail.status)
            }
        }

        for (const [key, value] of Object.entries(listeners)) {
            window.addEventListener(key, value)
        }

        return () => {
            for (const [key, value] of Object.entries(listeners)) {
                window.removeEventListener(key, value)
            }
        }
    }, [board, holding])

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
                                tryMove={tryMove}
                                key={j}
                                color={color}
                                position={{ x: i, y: j }}
                                peice={board[i][j] === undefined ?  : board[i][j] as Peice}
                                size={height - 50}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}


