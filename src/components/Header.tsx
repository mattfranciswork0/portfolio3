import { render } from "react-dom";
import React, { useState } from "react";
import { useTransition, animated, useSpring, useTrail } from "react-spring";

const Header: React.FC<{}> = () => {
    const [isBurgerClicked, setBurgerClicked] = useState(false);
    const firstLineRotate = useSpring({
        transform: isBurgerClicked ? "rotate(45deg)" : "rotate(0deg)",
        bottom: isBurgerClicked ? "100%" : "90%",
        config: {
            friction: 10,
        },
    });
    const secondLineRotate = useSpring({
        transform: isBurgerClicked ? "rotate(-45deg)" : "rotate(0deg)",
        bottom: isBurgerClicked ? "100%" : "0%",
        config: {
            friction: 10,
        },
    });

    return (
        <nav>
            <h4 className="headerName">Matthew Francis</h4>
            <div
                className="burger"
                onClick={() => setBurgerClicked(!isBurgerClicked)}
            >
                <animated.div
                    className="firstLine"
                    style={firstLineRotate}
                ></animated.div>
                <animated.div
                    className="secondLine"
                    style={secondLineRotate}
                ></animated.div>
            </div>
        </nav>
    );
};

export default Header;
