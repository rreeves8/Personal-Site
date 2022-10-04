import { useState } from "react"
import ArrayWalkThrough from "./walkthrough/ArrayWalkThrough"
import Asteriods from "./Asteriods"
import SortedToDo from "./SortedToDo"
import Board from "./chess/Chess"

const Block = ({ onclick, header, body }: { header: string, body: string, onclick: () => void }) => {
    const [isHovered, setHovered] = useState<boolean>(false)
    const [isClicking, setClicking] = useState<boolean>(false)

    return (
        <div
            style={{
                border: '2px solid rgba(102,119,136,.8)',
                width: '15vw',
                height: '15vh',
                display: 'flex',
                flexDirection: 'column',
                padding: 10,
                ...(isHovered ? {
                    background: '#D3D3D3',
                    ...(isClicking ? {
                        cursor: 'grabbing'
                    } : {
                        cursor: 'grab'
                    })
                } : {}),
                overflow: 'auto'
            }}
            onClick={onclick}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onMouseDown={() => setClicking(true)}
            onMouseUp={() => setClicking(false)}
        >
            <text className='font' style={{ textAlign: 'left', fontSize:'large', fontWeight: 'bold', marginBottom: 4, color: 'white' }}>{header}</text>
            <text className='font' style={{ textAlign: 'left', fontSize: 'calc((10vw - 4.5rem) / 7)',  fontStretch: 'expanded', color: 'white' }}>{body}</text>
        </div>
    )
}


export default function Games() {
    const [selectedGame, setSelectedState] = useState<string>('')

    const setSelected = async (type: string) => {
        if (selectedGame === 'asteroids' && type === 'asteroids') {
            setSelectedState('')
        }

        if (selectedGame === 'asteroids') {
            console.log('dispatching close unity')
            window.dispatchEvent(new CustomEvent('close-unity'))
            await new Promise<void>(resolve => {
                const resolver = (event: Event) => {
                    console.log('got close unity')
                    event.stopPropagation()
                    window.removeEventListener('unity-closed', resolver)
                    resolve()
                }
                window.addEventListener('unity-closed', resolver)
            })
            setSelectedState(type)
        }
        else {
            setSelectedState(type)
        }
    }

    let href = (() => {
        switch (selectedGame) {
            case 'sorted-to-do':
                return 'https://github.com/rreeves8/sorted-to-do-react-native'

            case 'array':
                return 'https://github.com/ShaimaaAliECE/se3350_project-group-2-1'

            default:
                return ''
        }
    })()


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 70
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
            >
                <text style={{ width: '500px', fontSize: 'x-large', fontFamily: 'Brandon Grotesque Regular, sans-serif', color: 'white' }}>
                    Here's a small collection of the Projects I've worked on in the past.
                    To check out more of them visit my Github at <a style={{color: 'white'}} href="https://github.com/rreeves8">rreeves8</a>
                </text>

                <div
                    style={{
                        gap: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    }}
                >

                    <text className="font" style={{ fontWeight: 'bold', color: 'white' }}>
                        Select a Project
                    </text>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 25
                        }}
                    >
                        <Block
                            onclick={() => {
                                setSelected('sorted-to-do')
                            }}
                            header='Sorted To Do'
                            body="Using React Native and Expo I built a mobile app for keeping track of tasks. Using a screen stack the user can navigate between views of sorting tasks, adding tasks and modifing them."
                        />
                        <Block
                            onclick={() => {
                                setSelected('array')
                            }}
                            header='Array Sorting'
                            body="Using react spring in a group projct for school,  I built an automated array sorting animation. "
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 25
                        }}
                    >
                        <Block
                            onclick={() => {
                                setSelected('asteroids')
                            }}
                            header='Asteriods'
                            body="Using unity in my second year of school I created a simple asteriods game. I exported it to webGL for use on my website."
                        />
                        <Block
                            onclick={() => {
                                setSelected('chess')
                            }}
                            header='Play Chess'
                            body=""
                        />
                    </div>
                </div>
            </div>

            <div>
                <div
                    style={{
                        boxShadow: 'rgb(0 0 0 / 60%) 0 3px 10px',
                        width: '50vw',
                        height: selectedGame === 'sorted-to-do' ? 'fit-content' : '60vh',
                        borderRadius: 20,
                        marginBottom: 10,
                        backgroundColor: 'whitesmoke'
                    }}
                >
                    {(() => {
                        switch (selectedGame) {
                            case 'sorted-to-do':
                                return <SortedToDo/>

                            case 'array':
                                return <ArrayWalkThrough />

                            case 'chess':
                                return <Board/>

                            case 'asteroids':
                                return <div style={{ height: '100%', width: '100%' }}>
                                    <text 
                                        className='font' 
                                        style={{ color: 'white', position: 'absolute', marginLeft: 'auto', marginRight: 'auto' }}
                                    >
                                        Use WASD to move, and Space to fire</text>
                                    <Asteriods />
                                </div>

                            default:
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <text className='font' >
                                            nothing selected
                                        </text>
                                    </div>
                                )
                        }
                    })()}
                </div>
                {href === '' ? (
                    <a className='font' style={{ color: 'white'}}>No Repo</a>
                ) : (
                    <a className='font' href={href} target="_blank" style={{ color: 'white'}}>Repo</a>
                )}
              
            </div>
        </div>
    )
}