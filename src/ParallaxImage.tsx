import { Parallax as ParallaxDef } from 'react-parallax';

type ParallaxProps = { 
    image?: any, 
    children?: React.ReactNode, 
    style?: { [key: string]: any } 
    contentClass?: string
}


export default function ParallaxImage({ image, children, style, contentClass }: ParallaxProps) {
    return (
        <ParallaxDef className='content' bgImage={image ? image : null} bgImageStyle={style} strength={400} contentClassName={contentClass ? contentClass : ''}>
            {children ? children : <></>}
        </ParallaxDef>
    )
}
