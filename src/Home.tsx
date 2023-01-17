import { useEffect, useRef } from "react";
import FallingCat from "./views/components/FallingCat";
import Title from "./views/screens/Title";
import Experince from "./views/screens/Experince";
import Projects from "./views/screens/Projects";
import SocialSection from "./views/screens/Socials";
import BreakComponent from "./views/components/BreakView";

export default function Home() {
    const chessRef = useRef(null);

    useEffect(() => {
        if (window.location.pathname === "/chess") {
            //@ts-ignore
            chessRef.current.scrollIntoView();
        }
    });

    return (
        <>
            <FallingCat />
            <Title />
            <Experince />
            <Projects chessRef={chessRef} />
            <SocialSection />
            <BreakComponent height="15vh" animatedDivStyle={{ height: "100%", width: "100%" }}>
                <div
                    style={{
                        backgroundColor: "black",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <text style={{ fontSize: "x-large", fontFamily: "Brandon Grotesque Regular, sans-serif", color: "white" }}>
                        Check out the repo for this website here: <a href="https://github.com/rreeves8/Personal-Site">Repo</a>
                    </text>
                </div>
            </BreakComponent>
        </>
    );
}
