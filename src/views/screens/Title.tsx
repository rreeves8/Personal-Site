import ParallaxImage from "../components/ParallaxImage";
import background from "../imgs/background2.jpg";
import { Icon } from "../components/Icon";

export default function Title() {
    return (
        <ParallaxImage image={background} style={{ top: "-390px" }} contentClass="backGroundContent">
            <text
                style={{
                    fontFamily: "Brandon Grotesque Medium, sans-serif",
                    color: "black",
                    position: "relative",
                    left: 200,
                    fontSize: "64px",
                }}
            >
                Hi I'm Magnus
            </text>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    right: "2vw",
                    bottom: "2vw",
                    backgroundColor: "#28282B",
                    borderRadius: "10px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    paddingLeft: "30px",
                    paddingRight: "25px",
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.cursor = "grab";
                }}
                onClick={() => {
                    window.location.replace("/chess");
                }}
            >
                <text
                    style={{
                        fontFamily: "Brandon Grotesque Medium, sans-serif",
                        color: "white",
                        fontSize: "20px",
                    }}
                >
                    skip to chess
                </text>
                <Icon name="keyboard_double_arrow_down" size={40} style={{ color: "white" }} disableHover={true} />
            </div>
        </ParallaxImage>
    );
}
