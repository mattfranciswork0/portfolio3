import { render } from "react-dom";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import history from "../browserHistory";
import { useTransition, animated, useSpring, useTrail } from "react-spring";

const DetailBack: React.FC<{}> = () => {
    const [isBackHovered, setIsBackHovered] = useState(false);
    const backSpring = useSpring({
        transform: isBackHovered
            ? "translate3d(-25% , 0px, 0px)"
            : "translate3d(0px , 0px, 0px)",

        config: {
            friction: 50,
            tension: 100,
        },
    });

    return (
        <div className="backWrap">
            <animated.div
                style={backSpring}
                onClick={() => history.goBack()}
                onMouseEnter={() => setIsBackHovered(true)}
                onMouseLeave={() => setIsBackHovered(false)}
                className="backInnerWrap"
            >
                <div className="backBox"></div>
                <h1>Back</h1>
            </animated.div>
        </div>
    );
};

export default DetailBack;
