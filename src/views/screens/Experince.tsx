import BreakComponent from "../components/BreakView";
import paragraphs from "../Paragraphs.json";
import all from "../imgs/experince2.png";

export default function Experince() {
    return (
        <BreakComponent
            header={
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <div className="black-line" />
                    <text style={{ fontSize: "xx-large", fontFamily: "Brandon Grotesque Medium, sans-serif", width: "14vw" }}>My Expreince</text>
                    <div className="black-line" />
                </div>
            }
            height="fit-content"
        >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20, marginBottom: 100 }}>
                <text
                    style={{
                        width: "900px",
                        fontSize: "larger",
                        fontFamily: "Brandon Grotesque Regular, sans-serif",
                        marginBottom: "40px",
                    }}
                >
                    {paragraphs.title}
                </text>

                <img src={all}></img>
            </div>
        </BreakComponent>
    );
}
