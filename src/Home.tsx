import ParallaxImage from './ParallaxImage'
import background from './imgs/background2.jpg'
import Projects from './games/Projects'
import all from './imgs/experince2.png'
import space from './imgs/space.jpg'

import { animated, useSpring } from 'react-spring'
import { StyleHTMLAttributes, useEffect, useRef, useState } from 'react'
import FallingCat from './FallingCat'
import Socials from './Socials'

type BreakComponentProps = { 
    header?: string | React.ReactNode, 
    children?: React.ReactNode | string, 
    height?: string, 
    animatedDivStyle?: React.CSSProperties 
}


const BreakComponent = ({ header, height, children, animatedDivStyle }: BreakComponentProps) => {
    const ref = useRef(null)
    const [isVisible, setVisible] = useState(false)
    const [styles, api] = useSpring(() => ({ opacity: 0 }))

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            if (!isVisible) {
                api.start({
                    opacity: 1,
                    delay: 500
                })
                setVisible(true)
            }
        }
    }
    )

    useEffect(() => {
        observer.observe(ref.current as unknown as Element)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])

    return (
        <div ref={ref} style={{ width: '100%', height: height ? height : '25vh', textAlign: 'center', marginTop: 40 }}>
            {header ? (
                <>
                    {typeof header === 'string' ? (
                        <text style={{ fontSize: 'xx-large', fontFamily: 'Brandon Grotesque Medium, sans-serif' }}>
                            {header}
                        </text>
                    ) : (header)}
                </>
            ) : <></>}
            <animated.div 
                style={{
                    ...styles, 
                    ...(animatedDivStyle ? animatedDivStyle: {})
                }}
            >
                {children ? children : <></>}
            </animated.div>
        </div>

    )
}

export default function Home() {

    return (
        <>
            <FallingCat />
            <ParallaxImage image={background} style={{ top: '-390px' }} contentClass='backGroundContent'>
                <text style={{ fontFamily: 'Brandon Grotesque Medium, sans-serif', color: 'black', position: 'relative', left: 200, fontSize: '64px' }}>Hi I'm Magnus</text>
            </ParallaxImage>
            <BreakComponent
                header={
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='black-line' />
                        <text style={{ fontSize: 'xx-large', fontFamily: 'Brandon Grotesque Medium, sans-serif', width: '14vw' }}>
                            My Expreince
                        </text>
                        <div className='black-line' />
                    </div>
                }
                height='fit-content'
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20, marginBottom: 100 }} >
                    <text
                        style={{
                            width: '900px',
                            fontSize: 'larger',
                            fontFamily: 'Brandon Grotesque Regular, sans-serif',
                            marginBottom: '40px'
                        }}
                    >
                        I'm a 5th-year Software Engineering student at Western University with a passion for Javascript and web development. In my free time, I'm an avid hockey player and skier.
                    </text>

                    <img src={all}></img>
                </div>
            </BreakComponent>
            <ParallaxImage image={space} contentClass='center'>
                <BreakComponent
                    height='fit-content'
                    header={
                        <text
                            style={{
                                fontSize: 'xx-large',
                                fontFamily: 'Brandon Grotesque Medium, sans-serif',
                                color: 'white'
                            }}
                        >Demo My Projects</text>
                    }
                >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 60, marginBottom: 60, zIndex: 5 }}>
                        <Projects />
                    </div>
                </BreakComponent>
            </ParallaxImage>

            <BreakComponent
                height='fit-content'
                header='Contact and Socials'
            >
                <Socials />
            </BreakComponent>
            <BreakComponent height='15vh' animatedDivStyle={{ height: '100%', width: '100%' }}>
                <div style={{ backgroundColor: 'black', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <text style={{  fontSize: 'x-large', fontFamily: 'Brandon Grotesque Regular, sans-serif', color: 'white'}}>
                        Check out the repo for this website here: <a href='https://github.com/rreeves8/Personal-Site'>Repo</a>
                    </text>
                </div>
            </BreakComponent>
        </>
    )
}