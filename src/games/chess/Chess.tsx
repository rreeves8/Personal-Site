/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useMemo, useRef, useState } from 'react';
import useMeasure from 'react-use-measure'
import { boardColors, pieces, PeiceWholeBoard } from './constants'
import { PeiceType, ChessBoard, Peice, Move, Board, Player } from './chess-computer/'

type Draggables = {
    dragStart: (coord: Coord) => void
    dragEnter: (coord: Coord) => void
    drop: () => void
}

const PeiceComponent = ({ peice, size, dragStart, dragEnter, drop, turn }: { peice: Peice, size: number, turn: Player } & Draggables) => {
    const [ref, { x, y }] = useMeasure()

    return (
        <div>
            <img
                draggable={peice.getPlayer() === turn}
                onDragOver={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onDrop={(e) => drop()}
                onDragStart={(e) => dragStart(peice.getPosition() as Coord)}
                onDragEnter={(e) => dragEnter(peice.getPosition() as Coord)}
                style={{ opacity: 1 }}
                src={pieces[peice.getName() as PeiceWholeBoard]}
                height={`${size / 8}px`}
                width={`${size / 8}px`}
            ></img>
        </div>
    )
}

type Coord = [number, number]

type CellProps = {
    color: string,
    size: number,
    peice: Peice | ""
    coord: [number, number]
    dragStart: (coord: Coord) => void
    dragEnter: (coord: Coord) => void
    drop: () => void
    turn: Player
}

const Cell = ({ color, size, coord, peice, dragStart, dragEnter, drop, turn }: CellProps) => {

    return (
        <div
            draggable={peice instanceof Peice && peice.getPlayer() === turn}
            style={{ backgroundColor: color, height: `${size / 8}px`, width: `${size / 8}px` }}
            onDragEnter={() => dragEnter(coord)}
            onDrop={(e) => drop()}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            {peice instanceof Peice ? (
                <PeiceComponent
                    peice={peice as Peice}
                    size={size}
                    dragStart={dragStart}
                    drop={drop}
                    turn={turn}
                    dragEnter={() => dragEnter(coord)}
                />
            ) : <></>}
        </div>
    )
}






export default function BoardComponent() {
    const [ref, { height }] = useMeasure()
    const [turn, setTurn] = useState<Player>('white')
    const [gameLogic] = useState<ChessBoard>(() => new ChessBoard())
    const [board, setBoard] = useState<Board>(() => [...gameLogic.getboard()])


    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);

    const dragStart = (position: Coord) => {
        //@ts-ignore
        dragItem.current = position;
    };

    const dragEnter = (position: Coord) => {
        //@ts-ignore
        dragOverItem.current = position;
    };

    const drop = () => {
        console.log('drop')
        let oldPos = dragItem.current as unknown as Coord
        let newPos = dragOverItem.current as unknown as Coord

        console.log(...oldPos, ...newPos)
        let moveMade = gameLogic.makeMove(...oldPos, ...newPos, turn)

        if (moveMade) {
            console.log('rerender')
            setBoard((oldBoard) => [...gameLogic.getboard()])
            setTurn(() => gameLogic.getPlayerMove())
        }
    };

    console.log(turn)
    console.log(gameLogic.getPlayerMove())

    return (
        <div ref={ref} style={{ height: '100%', width: '100%', padding: 25 / 2 }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
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
                                turn={turn}
                                coord={[i, j]}
                                key={j}
                                color={color}
                                peice={board[i][j]}
                                size={height - 50}
                                dragEnter={dragEnter}
                                dragStart={dragStart}
                                drop={drop}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}


