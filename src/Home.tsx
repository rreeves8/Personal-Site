import { useEffect, useRef } from "react";
import { Background, Parallax } from "react-parallax";
import { Button } from "reactstrap";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import background from "./imgs/background2.png";
import Projects from "./projects/page";
import Personal from "./personal/page";
import { useNavigate } from "react-router-dom";
import FallingCat from "./(components)/FallingCat";

export default function Home() {
    const chessRef = useRef(null);
    const router = useNavigate();

    useEffect(() => {
        if (window.location.pathname === "/chess") {
            //@ts-ignore
            chessRef.current.scrollIntoView();
        }
    });

    return (
        <>
            <FallingCat />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Parallax bgImage={background} className="content" strength={400} bgImageStyle={{ top: "-100px" }}>
                            <div
                                style={{
                                    position: "relative",
                                    left: 1000,
                                    top: 400,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2.5vh",
                                }}
                            >
                                <text
                                    style={{
                                        fontFamily: "Brandon Grotesque medium",
                                        color: "black",
                                        fontSize: "64px",
                                    }}
                                >
                                    Hi I&apos;m Magnus
                                </text>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100%",
                                        justifyContent: "center",
                                        gap: "3vw",
                                    }}
                                >
                                    <Button color="primary" size="lg" onClick={() => router("/personal")}>
                                        About me
                                    </Button>
                                    <Button color="primary" size="lg" onClick={() => router("/projects")}>
                                        Projects
                                    </Button>
                                </div>
                            </div>
                        </Parallax>
                    }
                ></Route>
                <Route path="personal" element={<Personal />} />
                <Route path="projects" element={<Projects />} />
            </Routes>
        </>
    );
}
