

interface Peices {
    [key: string]: Promise<any>
}


export const pieces: Peices = {
    'king-white': import('../../imgs/king-white.png'),
    'king-black': import('../../imgs/king-black.png'),
    'queen-white': import('../../imgs/queen-white.png'),
    'queen-black': import('../../imgs/queen-black.png'),
    'bishop-white': import('../../imgs/bishop-white.png'),
    'bishop-black': import('../../imgs/bishop-black.png'),
    'castle-white': import('../../imgs/castle-white.png'),
    'castle-black': import('../../imgs/castle-black.png'),
    'pawn-white': import('../../imgs/pawn-white.png'),
    'pawn-black': import('../../imgs/pawn-black.png'),
    'knight-white': import('../../imgs/knight-white.png'),
    'knight-black': import('../../imgs/knight-black.png'),
}