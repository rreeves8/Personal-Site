
let backRow = ['castle', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'castle']



console.table((() => {
    return [
        Array.from(new Array(8), (_, i) => backRow[i] + '-black'),
        Array.from(new Array(8), (_, i) => 'pawn-black'), 
        ...Array.from(new Array(4) , () => new Array(8).fill(undefined)),
        Array.from(new Array(8), (_, i) => 'pawn-white'), 
        Array.from(new Array(8), (_, i) => backRow[i]+ '-white')
    ]
})())