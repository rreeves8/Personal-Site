import ParallaxImage from './ParallaxImage'
import background from './imgs/background2.jpg'
import Projects from './games/Projects'
import all from './imgs/experince2.png'
import space from './imgs/space.jpg'
import { animated, useSpring } from 'react-spring'
import { StyleHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import FallingCat from './FallingCat'
import Socials from './Socials'
import BreakComponent from './BreakComponent'
import { useGravity, GravityDiv } from './Gravity'
import useMeasure from 'react-use-measure'
import cat from './imgs/cat.gif'

export default function Home() {
    const [ref, bounds] = useMeasure()
    const state = useRef(false)

    const [start] = useGravity()
    
    useEffect(() => {
        if(!state.current){
            start()
            state.current = true
        }
    })
      
    return (
        <div ref = {ref}>
            <GravityDiv>
            <   img src={cat} width={100} height={125}></img>
            </GravityDiv>

            <FallingCat />
            <ParallaxImage image={background} style={{ top: '-200px' }} contentClass='backGroundContent'>
                <text style={{ fontFamily: 'Brandon Grotesque Medium, sans-serif', color: 'black', position: 'relative', left: 200, fontSize: '64px' }}>Hey, I'm Magnus</text>
            </ParallaxImage>
            <BreakComponent
                header={
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='black-line' />
                        <text style={{ fontSize: 'xx-large', fontFamily: 'Brandon Grotesque Medium, sans-serif', width: '14vw' }}>
                            My Experience
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
                        I'm a Software Engineering student at Western University with a passion for Javascript and web development. In my free time, I'm an avid hockey player and skier.
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
        </div>
    )
}