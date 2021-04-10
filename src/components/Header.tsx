import { render } from "react-dom";
import React, { useState } from "react";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
const titles = ["Projects", "About Me", "Career Timeline", "Contact"];
const Header: React.FC<{}> = () => {
    const [isBurgerClicked, setBurgerClicked] = useState(false);

    const [titleIndex, setTitleIndex] = useState<number>(-1);
    const translateTitle = useSpring({
        transform: isBurgerClicked
            ? "translate3d(0% , 0%, 0px)"
            : "translate3d(0px , 15%, 0px)",

        config: {
            friction: 40,
        },
    });

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

    const cross = useTransition(titleIndex, {
        from: {
            width: "0%",
        },
        enter: {
            width: "100%",
        },

        config: {
            mass: 1,
            tension: 300,
            friction: 50,
        },
    });
    const dropdownControl = useSpring({
        transform: !isBurgerClicked
            ? "translate3d(0% , -100%, 0px)"
            : "translate3d(0px , 0%, 0px)",

        config: {
            friction: 20,
            tension: 120,
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
            <animated.div className="burgerDropdown" style={dropdownControl}>
                {titles.map((title, index) => {
                    return (
                        <animated.div
                            key={index}
                            className="dropdownTitleWrap"
                            style={translateTitle}
                            onMouseEnter={() => setTitleIndex(index)}
                            onMouseLeave={() => setTitleIndex(-1)}
                        >
                            <h1>
                                {title}
                                {cross((style, item) => {
                                    return (
                                        item === index && (
                                            <animated.div
                                                style={style}
                                                className="crossTitle"
                                            ></animated.div>
                                        )
                                    );
                                })}
                            </h1>
                        </animated.div>
                    );
                })}
            </animated.div>
        </nav>
    );
};

export default Header;
