

const boardColors = Array.from(new Array(8), (v, i) => {
    return new Array(8).fill(i % 2 === 0 ? 'white' : 'black')
})

const Cell = ({ color }: { color: string}) => {
    return (
        <div style={{ backgroundColor: color, height: '40px', width: '40px' }}>

        </div>
    )
}


export default function Board(){


    return 

}


