import { render } from "react-dom";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import history from "../browserHistory";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import { useLocation } from "react-router-dom";
interface DetailBackProps {
    customBackground?: string;
    customBackColor?: string;
    match?: any;
}
const DetailBack: React.FC<DetailBackProps> = (props) => {
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
    const location = useLocation();

    return (
        <div
            className={`back ${
                location.pathname === "/projects"
                    ? "back__purple-dark-background"
                    : ""
            }`}
        >
            <animated.div
                style={backSpring}
                onClick={() => history.goBack()}
                onMouseEnter={() => setIsBackHovered(true)}
                onMouseLeave={() => setIsBackHovered(false)}
                className="back--animated"
            >
                <div
                    className={`back__box ${
                        location.pathname === "/projects"
                            ? "back__white-box"
                            : ""
                    }`}
                ></div>
                <h1
                    className={`${
                        location.pathname === "/projects"
                            ? "back__white-text"
                            : ""
                    }`}
                >
                    Back
                </h1>
            </animated.div>
        </div>
    );
};

export default DetailBack;
