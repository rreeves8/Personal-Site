import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useMeasure from 'react-use-measure'

type Gravity = { x: number, y: number }


export function GravityDiv({ children }: { children: React.ReactNode }) {
    const [position, setPosition] = useState<Gravity>({ x: 0, y: 0 })

    useEffect(() => {
        const listener = (event: Event) => {
            //@ts-ignore
            setPosition(event.detail)
        }
        window.addEventListener('gravity', listener)

        return () => window.removeEventListener('gravity', listener, false)
    })

    let transition = `translate(${position.x}px,${position.y}px)`

    return (
        <div style={{ transform: transition, position: 'absolute', zIndex: 5 }}>
            {children}
        </div>
    )
}


export const useGravity = (): [() => void] => {
    let start = () => {
        let time = 0
        let initialY = document.documentElement.offsetHeight
        let y = initialY
        
        console.log('ran callback')
        
        const getY = (time: number): number => {
            return initialY - (0.5 * (9.81 * 3) * time ^ 2)
        }
        
        const interval = setInterval(() => {
            time += 1
            
            y = getY(time)
              
            if (y < 0) {
                clearInterval(interval)
            }
            else {
                window.dispatchEvent(new CustomEvent('gravity', { detail: { y, x: 0 }}))
            }
        }, 1)
    }
    
    return [
        () => window.addEventListener('load', () => {
            start()
        })    
    ]
}