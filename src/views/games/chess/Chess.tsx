/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { boardColors, pieces, PeiceWholeBoard } from "./constants";
import { PeiceType, ChessBoard, Peice, Move, Board, Player } from "./chess-computer/";

type Coord = [number, number];

type CellProps = {
    color: string;
    size: number;
    peice: Peice | "";
    coord: [number, number];
    dragStart: (coord: Coord) => void;
    dragEnter: (coord: Coord) => void;
    drop: () => void;
    turn: Player;
};

type Draggables = {
    dragStart: (coord: Coord) => void;
    dragEnter: (coord: Coord) => void;
    drop: () => void;
};

const PeiceComponent = ({ peice, size, dragStart, dragEnter, drop, turn }: { peice: Peice; size: number; turn: Player } & Draggables) => {
    return (
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
    );
};

const Cell = ({ color, size, coord, peice, dragStart, dragEnter, drop, turn }: CellProps) => {
    return (
        <div
            draggable={peice instanceof Peice && peice.getPlayer() === turn}
            style={{ backgroundColor: color, height: `${size / 8}px`, width: `${size / 8}px`, outline: "none" }}
            onDragEnter={() => dragEnter(coord)}
            onDrop={(e) => drop()}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            {peice instanceof Peice ? (
                <PeiceComponent peice={peice as Peice} size={size} dragStart={dragStart} drop={drop} turn={turn} dragEnter={() => dragEnter(coord)} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default function BoardComponent() {
    const [ref, { height }] = useMeasure();
    const [turn, setTurn] = useState<Player>("white");
    const [gameLogic, setGameLogic] = useState<ChessBoard>(() => new ChessBoard());
    const [board, setBoard] = useState<Board | undefined>(() => [...gameLogic.getboard()]);
    const [winner, setWinner] = useState<Player | undefined>();

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (position: Coord) => {
        //@ts-ignore
        dragItem.current = position;
    };

    const dragEnter = (position: Coord) => {
        //@ts-ignore
        dragOverItem.current = position;
    };

    const drop = () => {
        let oldPos = dragItem.current as unknown as Coord;
        let newPos = dragOverItem.current as unknown as Coord;

        console.log(...oldPos, ...newPos);
        let moveMade = gameLogic.makeMove(...oldPos, ...newPos, turn);

        if (moveMade) {
            if (gameLogic.getWinner()) {
                setWinner(gameLogic.getWinner() as Player);
            } else {
                setBoard((oldBoard) => [...gameLogic.getboard()]);
                setTurn(() => gameLogic.getPlayerMove());
            }
        }
    };

    useEffect(() => {
        if (board === undefined) {
            setBoard(() => {
                return [...gameLogic.getboard()];
            });
        }
    }, []);

    return (
        <>
            {typeof winner === "undefined" ? (
                <>
                    <div>
                        
                    </div>
                    <div ref={ref} style={{ height: "100%", width: "100%", padding: 25 / 2 }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "fit-content",
                                width: "fit-content",
                                marginLeft: "auto",
                                marginRight: "auto",
                                border: "2px solid #a97a65",
                            }}
                        >
                            {boardColors.map((row, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "row" }}>
                                    {row.map((color, j) => (
                                        <Cell
                                            turn={turn}
                                            coord={[i, j]}
                                            key={j}
                                            color={color}
                                            peice={(board as Board)[i][j]}
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
                </>
            ) : (
                <>
                    <text>winner! : {winner}</text>
                    <button
                        onClick={() => {
                            setWinner(undefined);
                            setGameLogic(new ChessBoard());
                        }}
                    >
                        restart
                    </button>
                </>
            )}
        </>
    );
}
