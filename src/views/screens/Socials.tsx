import { useState } from "react";
import BreakComponent from "../components/BreakView";
import { Icon } from "../components/Icon";
import github from "../imgs/github.png";
import linkedin from "../imgs/linkedin.png";

const Socials = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 200,
                marginTop: 80,
            }}
        >
            <a href="https://github.com/rreeves8" download>
                <img src={github} height={200} width={200}></img>
            </a>

            <a href="https://www.linkedin.com/in/magnus-reeves-2664121b0/" download>
                <img src={linkedin} height={200} width={200}></img>
            </a>

            <div>
                <a href="Magnus_Resume.pdf" download>
                    <Icon name="download" style={{ padding: "25" }} />
                </a>
                <text style={{ fontFamily: "Brandon Grotesque Regular, sans-serif", fontSize: "large" }}>download my resume</text>
            </div>
        </div>
    );
};

export default function SocialSection() {
    return (
        <BreakComponent height="fit-content" header="Contact and Socials">
            <Socials />
        </BreakComponent>
    );
}
