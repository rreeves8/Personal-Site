import { useEffect, useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { boardColors } from "./constants";
import { PeiceType, ChessBoard, Peice, Move, Board, Player } from "./chess-computer/";
import React from "react";

type Coord = [number, number];

type CellProps = {
    color: string;
    size: number;
    peice: Peice | "";
    coord: [number, number];
    dragStart: (coord: Coord) => void;
    dragEnter: (coord: Coord) => void;
    drop: () => void;
};

type Draggables = {
    dragStart: (coord: Coord) => void;
    dragEnter: (coord: Coord) => void;
    drop: () => void;
};

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

// const Kingwhite = () => <img src={kingWhite} style={{ width: "100%" }} />;
// const KingBlack = () => <img src={kingBlack} style={{ width: "100%" }} />;
// const QueenWhite = () => <img src={queenWhite} style={{ width: "100%" }} />;
// const QueenBlack = () => <img src={queenBlack} style={{ width: "100%" }} />;
// const BishopWhite = () => <img src={bishopWhite} style={{ width: "100%" }} />;
// const BishopBlack = () => <img src={bishopBlack} style={{ width: "100%" }} />;
// const CastleWhite = () => <img src={castleWhite} style={{ width: "100%" }} />;
// const CastleBlack = () => <img src={castleBlack} style={{ width: "100%" }} />;
// const PawnWhite = () => <img src={pawnWhite} style={{ width: "100%" }} />;
// const PawnBlack = () => <img src={pawnBlack} style={{ width: "100%" }} />;
// const KnightWhite = () => <img src={knightWhite} style={{ width: "100%" }} />;
// const KnightBlack = () => <img src={knightBlack} style={{ width: "100%" }} />;

const PeiceComponent = ({ peice, size, dragStart, dragEnter, drop }: { peice: Peice; size: number } & Draggables) => {
    let id = peice.getMapName();

    return (
        <img
            id={id}
            draggable={peice.getPlayer() === "white"}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
            onDrop={(e) => drop()}
            onDragStart={(e) => {
                if (peice.getPlayer() === "black") e.preventDefault();
                dragStart(peice.getPosition() as Coord);
            }}
            onDragEnter={(e) => dragEnter(peice.getPosition() as Coord)}
            style={{
                opacity: 1,
                height: `${size / 8}px`,
                width: `${size / 8}px`,
                position: "relative",
            }}
        ></img>
    );
};

const Cell = ({ color, size, coord, peice, dragStart, dragEnter, drop }: CellProps) => {
    return (
        <div
            draggable={peice instanceof Peice && peice.getPlayer() === "white"}
            style={{ backgroundColor: color, height: `${size / 8}px`, width: `${size / 8}px`, outline: "none" }}
            onDragEnter={() => dragEnter(coord)}
            onDrop={(e) => drop()}
            onDragOver={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            {peice instanceof Peice ? (
                <PeiceComponent peice={peice as Peice} size={size} dragStart={dragStart} drop={drop} dragEnter={() => dragEnter(coord)} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default function BoardComponent({ size }: { size: string }) {
    const [ref, { height }] = useMeasure();
    const [turn, setTurn] = useState<Player>("white");
    const [gameLogic, setGameLogic] = useState<ChessBoard>(() => new ChessBoard());
    const [board, setBoard] = useState<Board | undefined>(() => [...gameLogic.getboard()]);
    const [winner, setWinner] = useState<Player | undefined>();
    const [awaitingAi, setAwaitingAi] = useState(false);

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

        let moveMade = gameLogic.makeMove(...oldPos, ...newPos, turn);

        if (moveMade) {
            setBoard((oldBoard) => [...gameLogic.getboard()]);
            setTurn(() => gameLogic.getPlayerMove());
        }
    };

    useEffect(() => {
        const updater = () => {
            setBoard((oldBoard) => [...gameLogic.getboard()]);
        };

        if (gameLogic.getWinner()) {
            setWinner(gameLogic.getWinner() as Player);
        } else if (turn === "black" && !awaitingAi) {
            setAwaitingAi(true);
            setTimeout(() =>
                gameLogic.testMode().then(() => {
                    updater();
                    setTurn(() => gameLogic.getPlayerMove());
                    setAwaitingAi(false);
                })
            );
        }

        window.addEventListener("move-made", updater);

        return () => window.removeEventListener("move-made", updater);
    }, [awaitingAi, gameLogic, board, turn]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent("peices", { detail: { args: { map: gameLogic.getPeices() } } }));

    }, [board]);

    return (
        <div ref={ref} style={{ height: size, width: size, padding: 25 / 2 }}>
            {winner ? (
                <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque Regular, sans-serif", position: "relative" }}>white</text>
            ) : (
                <></>
            )}

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
    );
}
