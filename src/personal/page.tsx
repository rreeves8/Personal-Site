"use client";

import { Button } from "reactstrap";
import BreakComponent from "../(components)/BreakView";
import { Parallax, Background } from "react-parallax";
import water from "../imgs/water.jpg";
import consoleOne from "../imgs/consoleOne.png";
import dc from "../imgs/dc.png";
import school from "../imgs/school.png";
import github from "../imgs/github-white.png";
import linkedin from "../imgs/linkedin.png";
import { Icon } from "../(components)/Icon";
import { useNavigate } from "react-router-dom";

export default function Personal() {
    const router = useNavigate();
    return (
        <>
            <Button style={{ position: "absolute", top: "2.5vh", left: "2.5vh" }} color="primary" size="regular" onClick={() => router("/")}>
                Back To Main
            </Button>

            <BreakComponent
                marginTop="5vh"
                height="fit-content"
                header={
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <div className="black-line" />
                        <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif", width: "14vw" }}>My Experience</text>
                        <div className="black-line" />
                    </div>
                }
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "5vh", marginTop: "3vh" }}>
                    <text style={{ fontSize: "x-large", fontFamily: "Brandon Grotesque Regular, sans-serif", width: "50vw" }}>
                        I&apos;m a 5th-year Software Engineering student at Western University with a passion for Javascript and web development. In
                        my free time, I&apos;m an avid hockey player and skier.
                    </text>
                </div>
            </BreakComponent>

            <BreakComponent marginTop="0" height="fit-content" extraDelay={400} threshold={0.1}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "fit-content" }}>
                    <img src={consoleOne} alt="personal photo" />
                </div>
            </BreakComponent>
            <BreakComponent marginTop="0" height="fit-content" extraDelay={800} threshold={0.1}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "fit-content" }}>
                    <img src={dc} alt="personal photo" />
                </div>
            </BreakComponent>
            <BreakComponent marginTop="0" height="fit-content" threshold={0.1}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "fit-content", marginBottom: "8vh" }}>
                    <img src={school} alt="personal photo" />
                </div>
            </BreakComponent>

            <Parallax className="image" strength={400} style={{ height: "80vh" }} contentClassName="fit-parent">
                <Background>
                    <img src={water} alt="personal photo" />
                </Background>
                <BreakComponent
                    height="100%"
                    marginTop="0"
                    style={{ display: "flex", flexDirection: "column" }}
                    header={
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "2vh",
                            }}
                        >
                            <text style={{ fontSize: "xxx-large", fontFamily: "Brandon Grotesque bold, sans-serif", color: "white" }}>Hobbies</text>
                        </div>
                    }
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "10vh",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            gap: "10vw",
                        }}
                    >
                        <text
                            style={{
                                fontSize: "xx-large",
                                fontFamily: "Brandon Grotesque Regular, sans-serif",
                                width: "30vw",
                                color: "white",
                            }}
                        >
                            In my free time I am an avid water skiier and hockey player, check out some of my content on my youtube channel.
                        </text>
                        <iframe
                            width="750"
                            height="421.874999999"
                            src="https://www.youtube.com/embed/Uk_FbOVJAP0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </BreakComponent>
            </Parallax>
            <BreakComponent
                height="fit-content"
                marginTop="0"
                style={{ height: "100%", width: "100%", backgroundColor: "black" }}
                header={
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <text style={{ fontSize: "xxx-large", fontFamily: "Brandon Grotesque bold, sans-serif", color: "white", marginTop: "2vh" }}>
                            Socials
                        </text>
                    </div>
                }
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: "2.5vh",
                        paddingBottom: "5vh",
                        gap: "20vw",
                    }}
                >
                    <a href="https://github.com/rreeves8" target="_blank" rel="noreferrer">
                        <img src={github} height={200} width={200} alt=""></img>
                    </a>

                    <a href="https://www.linkedin.com/in/magnus-reeves-2664121b0/" target="_blank" rel="noreferrer">
                        <img src={linkedin} height={200} width={200} alt=""></img>
                    </a>

                    <div>
                        <a href="Magnus_Resume.pdf" download>
                            <Icon name="download" style={{ padding: "25" }} />
                        </a>
                        <text style={{ fontFamily: "Brandon Grotesque Regular, sans-serif", fontSize: "large", color: "white" }}>
                            download my resume
                        </text>
                    </div>
                </div>
            </BreakComponent>

            <BreakComponent marginTop="1vh" height="10vh" threshold={0.1} extraDelay={400}>
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <text style={{ fontSize: "x-large", fontFamily: "Brandon Grotesque Regular, sans-serif", color: "black" }}>
                        Check out the repo for this website here:
                        <a href="https://github.com/rreeves8/personal-site-nextjs" target="_blank" rel="noreferrer">
                            Repo
                        </a>
                    </text>
                </div>
            </BreakComponent>
        </>
    );
}
