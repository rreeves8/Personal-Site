import { debounce, checkScrollDirectionIsUp } from "./utilites"
import { useEffect, useState } from "react"
import { animated, useSpring } from "react-spring"

import cat from './imgs/cat.gif'

export default function FallingCat() {
    const [scrollY, setScrollY] = useState(0);
    const [timeout, setTimeoutValue] = useState<NodeJS.Timeout | null>(null)

    const [{ springscrollY, ...styles }, api] = useSpring(() => ({
        springscrollY: 0,
        opacity: 1
    }));
    
    useEffect(() => {
        const handleScroll = (event: any) => {
            // if(checkScrollDirectionIsUp(event)){
            //     api({ opacity: 0 })

            //     if(timeout){
            //         clearTimeout(timeout)
            //     }

            //     setTimeoutValue(setTimeout(() => {
            //         api({ opacity: 1 })
            //     }, 1000))
                
            // }

            setScrollY(window.scrollY)
        }
        window.addEventListener("scroll", debounce(handleScroll));
        return () => window.removeEventListener("scroll", debounce(handleScroll));
    }, [debounce]);


    api({ springscrollY: scrollY });
    
    const interpHeader = springscrollY.interpolate(
        o => `translateY(${o / 1}px)`
    );

    return (
        <animated.div style={{ position: 'absolute', bottom: 0,left: 10, zIndex: 3, transform: interpHeader, ...styles }}>
            <img src={cat} width={100} height={125}></img>
        </animated.div>
    )
}