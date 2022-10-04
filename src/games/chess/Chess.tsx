import { useEffect, useMemo, useState } from 'react';
import useMeasure from 'react-use-measure'
import { pieces } from './pieces'

function* generator(i: number) {
    let index = i
    while (true) {
        index++;
        yield index % 2 === 0 ? 'smoke-white' : '#a97a65'
    }
}

const boardColors = Array.from(new Array(8), (v, i) => {
    const GEN = generator(i)
    return new Array(8).fill(null).map(_ => GEN.next().value as string)
})

let backRow = ['castle', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'castle']

const Peice = ({ type }: { type: string}) => {
    const [src, setSrc] = useState<string>('alt')
    
    useEffect(() => {
        if(src === 'alt'){
            (async () => {
                pieces[type].then((img) => setSrc(img))
            })()
        }
    })
    
    return (
        <div>
            <img src={src}></img>
        </div>
    )
}


const Cell = ({ color, size, children }: { color: string, size: number, children?: React.ReactNode }) => {
    return (
        <div style={{ backgroundColor: color, height: `${size/8}px`, width: `${size/8}px` }}>
            {children}
        </div>
    )
}


export default function Board(){
    const [ref, { height }] = useMeasure()

    const [peices, setPeices] = useState<Array<string>>(() => {
        return [
            ...Array.from(new Array(8), (_, i) => 'pawn-black'), 
            ...Array.from(new Array(8), (_, i) => backRow[i] + '-black'),
            ...Array.from(new Array(4) , () => new Array(8).fill(undefined)),
            ...Array.from(new Array(8), (_, i) => 'pawn-white'), 
            ...Array.from(new Array(8), (_, i) => backRow[i]+ '-white')
        ]
    })


    return (
        <div ref = {ref} style={{ height: '100%', width: '100%', padding: 25/2  }}>
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
                {boardColors.map((row, index) => (
                    <div key = {index} style={{ display: 'flex', flexDirection: 'row' }}>
                        {row.map((color, index) => (
                            <Cell key={index} color={color} size={height-50}>

                            </Cell>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}


