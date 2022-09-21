import { useState } from "react"
import github from './imgs/github.png'
import linkedin from './imgs/linkedin.png'

const Icon = ({ name }: { name: string }) => {
    const [hover, setHover] = useState(false)
    
    return(
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={()=> setHover(false)}
            style={{
                height:'fit-content',
                width: 'fit-content',
                borderRadius: 20,
                padding: '25',
                ...(hover ? {
                    backgroundColor: '#A0A0A0'
                }: {})
            }}
        >
            <span className="material-symbols-outlined" style={{ fontSize: 200 }}>
                {name}
            </span>
        </div>
    )
}


export default function Socials(){
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 200,
            marginTop: 80
        }}>
            
            <a href="https://github.com/rreeves8" download>
                <img src={github} height={200} width={200}></img>
            </a>

            <a href="https://www.linkedin.com/in/magnus-reeves-2664121b0/" download>
                <img src={linkedin} height={200} width={200}></img>
            </a>
           
            <div>
                <a href="Magnus_Resume.pdf" download>
                    <Icon name='download'/>
                </a>
                <text style={{  fontFamily: 'Brandon Grotesque Regular, sans-serif', fontSize: 'large' }}>download my resume</text>
            </div>
        </div>
    )
}