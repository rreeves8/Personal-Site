import BreakComponent from "../components/BreakView";
import ParallaxImage from "../components/ParallaxImage";
import Games from "../games/Games";
import space from "../imgs/space.jpg";

export default function Projects({ chessRef }: { chessRef: React.MutableRefObject<null> }) {
    return (
        <ParallaxImage image={space} contentClass="center">
            <BreakComponent 
                height="fit-content" 
                scrollRef={chessRef} 
                header={"Demo My Projects"} 
                headerColor="white"
            >
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 60, marginBottom: 60, zIndex: 5 }}>
                    <Games />
                </div>
            </BreakComponent>
        </ParallaxImage>
    );
}
