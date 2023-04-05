"use client";
import { Parallax, Background } from "react-parallax";
import BreakComponent from "../(components)/BreakView";
import space from "../imgs/space.jpg";
import { useEffect, useRef } from "react";
import BoardComponent from "./(chess)/Chess";
import Asteriods from "./(asteriods)/Asteriods";
import github from "../imgs/github.png";
import nextjs from "../imgs/Nextjs.png";
import firebase from "../imgs/firebase.png";
import react from "../imgs/react.png";
import { Button } from "reactstrap";
import FallingCat from "../(components)/FallingCat";
import { Link, useNavigate } from "react-router-dom";
import ArrayWalkThrough from "./(walkthrough/ArrayWalkThrough";

const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : ({} as URLSearchParams);

export default function Projects() {
    const chessRef = useRef(null);
    const router = useNavigate();

    useEffect(() => {
        if (params.has("game")) {
            if (params.get("game") === "chess") {
                //@ts-ignore
                chessRef.current.scrollIntoView();
            }
        }
    });

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
                        <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif", width: "14vw" }}>My Projects</text>
                        <div className="black-line" />
                    </div>
                }
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4vh", marginTop: "3vh" }}>
                    <text style={{ fontSize: "x-large", fontFamily: "Brandon Grotesque Regular, sans-serif", width: "50vw" }}>
                        Here&apos;s a collection of projects I&apos;ve worked on in the past presented using Unity's webgl exporter, a virtualized IOS
                        simulator, and webpack. Check out my github at:
                    </text>
                    <a style={{ marginTop: "4vh" }} href="https://github.com/rreeves8" target="_blank" rel="noreferrer">
                        <img src={github} width={70} />
                    </a>
                </div>
            </BreakComponent>

            <Parallax className="image" strength={400} style={{ height: "fit-content" }} contentClassName="fit-parent">
                <Background>
                    <img src={space} alt="personal photo" />
                </Background>
                <BreakComponent
                    extraDelay={500}
                    height="fit-content"
                    marginTop="2.5vh"
                    header={
                        <div style={{ width: "100%" }}>
                            <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif", color: "white" }}>Asteriods</text>
                        </div>
                    }
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10vw",
                            marginTop: "2.5vh",
                            marginBottom: "5vh",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "5vh" }}>
                            <text
                                style={{
                                    fontSize: "x-large",
                                    fontFamily: "Brandon Grotesque Regular, sans-serif",
                                    width: "25vw",
                                    color: "white",
                                }}
                            >
                                Using Unity in my second year of school I created a simple Asteroids game in C#. For use on this site I created a
                                simple event management system between javascript and the unity webgl engine.
                            </text>
                        </div>
                        <Asteriods />
                    </div>
                </BreakComponent>
            </Parallax>

            <BreakComponent
                marginTop="2.5vh"
                height="fit-content"
                animatedDivStyle={{ height: "100%", width: "100%" }}
                header={
                    <div ref={chessRef} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif", width: "14vw" }}>
                            React Experience
                        </text>
                    </div>
                }
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15vw",
                        marginBottom: "5vh",
                        marginTop: "5vh",
                    }}
                >
                    <text style={{ fontSize: "x-large", fontFamily: "Brandon Grotesque Regular, sans-serif", width: "25vw" }}>
                        Using React Spring in a group project for school, I built an automated sorting animation for any list of numbers of a fixed
                        length. By finding each element's next spot in the list, I can generate a vector for each position and animate its movement.
                    </text>
                    <ArrayWalkThrough style={{ width: "30vw" }} />
                </div>
            </BreakComponent>

            {/* <BreakComponent
                marginTop="2.5vh"
                height="fit-content"
                header={
                    <div ref={chessRef} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <text style={{ fontSize: "xxx-large", fontFamily: "Brandon Grotesque bold, sans-serif", width: "14vw" }}>Chess</text>
                    </div>
                }
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20vw",
                        marginBottom: "7vh",
                    }}
                >
                    <text
                        style={{
                            fontSize: "x-large",
                            fontFamily: "Brandon Grotesque Regular, sans-serif",
                            width: "25vw",
                            position: "relative",
                            top: "-2vh",
                        }}
                    >
                        Using Unity I&apos;ve created a chess game engine. The computer utilizes a decision tree and minimax algorithm to determine
                        the best move by scanning all possible game outcomes. My first iteration which is displayed here was built in React, however
                        webpack damages my code on build time. The fixed version will be released soon
                    </text>

                    <BoardComponent size="55vh" />
                </div>
            </BreakComponent> */}

            <Parallax className="image" strength={400} style={{ height: "75vh" }} contentClassName="fit-parent">
                <Background>
                    <img src={space} alt="personal photo" />
                </Background>
                <BreakComponent
                    height="fit-content"
                    marginTop="5vh"
                    header={
                        <div style={{ position: "absolute", width: "100%" }}>
                            <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif", color: "white" }}>
                                App Development
                            </text>
                        </div>
                    }
                >
                    <div
                        style={{
                            width: "100%",
                            height: "fit-content",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "18vw",
                        }}
                    >
                        <text
                            style={{
                                fontSize: "x-large",
                                fontFamily: "Brandon Grotesque Regular, sans-serif",
                                width: "30vw",
                                color: "white",
                            }}
                        >
                            Using React Native and Expo I built a mobile app for keeping track of tasks. Using a screen stack the user can navigate
                            between views of sorting tasks, adding tasks and modifing them. Using this simulator on the left you can try it out. I am
                            currently working on another mobile application that can be found on my github.
                        </text>
                        <div style={{ height: "fit-content", padding: "10px" }}>
                            <iframe
                                src="https://appetize.io/embed/t6x4h2ujrfog2twwwbfafvmkku?device=pixel4"
                                width="300px"
                                height="650px"
                                frameBorder="0"
                                scrolling="no"
                            ></iframe>
                        </div>
                    </div>
                </BreakComponent>
            </Parallax>

            <BreakComponent
                marginTop="2.5vh"
                height="fit-content"
                header={
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque bold, sans-serif" }}>Web Development</text>
                    </div>
                }
            >
                <div
                    style={{
                        marginTop: "8vh",
                        width: "100%",
                        height: "fit-content",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6vw",
                        marginBottom: "11vh",
                    }}
                >
                    <text
                        style={{
                            fontSize: "x-large",
                            fontFamily: "Brandon Grotesque Regular, sans-serif",
                            width: "25vw",
                        }}
                    >
                        As a software engineer, my area of expertise is web development. I am very talenated at creating websites and I enjoy building
                        them during school and my free time. My go-to web stack consists of React for frontend, NextJs for backend, and Firebase for
                        hosting. This website is built using these tools and the repo can be found below.
                    </text>

                    <img src={nextjs} alt="sdf" width={200} />
                    <img src={react} alt="sdf" width={200} />
                    <img src={firebase} alt="sdf" width={200} />
                </div>
            </BreakComponent>
            <BreakComponent marginTop="2.5vh" height="15vh" animatedDivStyle={{ height: "100%", width: "100%" }}>
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
                        Check out the repo for this website here:{" "}
                        <a href="https://github.com/rreeves8/personal-site-nextjs" target="_blank" rel="noreferrer">
                            Repo
                        </a>
                    </text>
                </div>
            </BreakComponent>
        </>
    );
}
