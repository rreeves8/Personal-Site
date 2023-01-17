import { useRef, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

type BreakComponentProps = {
    header?: string | React.ReactNode;
    children?: React.ReactNode | string;
    height?: string;
    animatedDivStyle?: React.CSSProperties;
    scrollRef?: React.MutableRefObject<null>;
    headerColor?: string;
};

export default function BreakComponent({ header, height, children, animatedDivStyle, scrollRef, headerColor }: BreakComponentProps){
    const currentRef = useRef(null);
    const [isVisible, setVisible] = useState(false);
    const [styles, api] = useSpring(() => ({ opacity: 0 }));

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            if (!isVisible) {
                api.start({
                    opacity: 1,
                    delay: 500,
                });
                setVisible(true);
            }
        }
    });

    useEffect(() => {
        observer.observe(currentRef.current as unknown as Element);
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={currentRef} style={{ width: "100%", height: height ? height : "25vh", textAlign: "center", marginTop: 40 }}>
            {header ? (
                <>
                    {typeof header === "string" ? (
                        <text
                            {...(scrollRef ? { ref: scrollRef } : {})}
                            style={{
                                fontSize: "xx-large",
                                fontFamily: "Brandon Grotesque Medium, sans-serif",
                                color: headerColor ? "white" : headerColor,
                            }}
                        >
                            {header}
                        </text>
                    ) : (
                        header
                    )}
                </>
            ) : (
                <></>
            )}
            <animated.div
                style={{
                    ...styles,
                    ...(animatedDivStyle ? animatedDivStyle : {}),
                }}
            >
                {children ? children : <></>}
            </animated.div>
        </div>
    );
};
