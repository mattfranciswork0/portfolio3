import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import { updateSlideIndex } from "../actions";
import { connect } from "react-redux";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import { useLocation } from "react-router-dom";
import history from "../browserHistory";
import { BiArrowBack } from "react-icons/bi";
import { StoreState } from "../reducers";
const titles = ["About Me", "Projects", "Career Timeline", "Contact"];

interface HeaderProps {
    updateSlideIndex: any;
    changeHeaderBackIconToBlack: boolean;
}
const Header: React.FC<HeaderProps> = (props) => {
    const location = useLocation();

    const [isBurgerClicked, setBurgerClicked] = useState(false);
    const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
    useEffect(() => {
        if (location.pathname === "/") {
            setIsBackButtonVisible(false);
        } else {
            //User must've clicked detial page
            setIsBackButtonVisible(true);
        }
    }, [location.pathname]);

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

    const backButtonTranslate = useSpring({
        transform: isBackButtonVisible
            ? "translate3d(0% , 0%, 0px)"
            : "translate3d(-100% , 0%, 0px)",

        config: {
            tension: 120,
            friction: 20,
        },
    });

    return (
        <nav>
            <div className="nameAndBurgerWrap">
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
                <animated.div
                    className="burgerDropdown"
                    style={dropdownControl}
                >
                    {titles.map((title, index) => {
                        return (
                            <animated.div
                                key={index}
                                className="dropdownTitleWrap"
                                style={translateTitle}
                            >
                                <h1
                                    onMouseEnter={() => setTitleIndex(index)}
                                    onMouseLeave={() => setTitleIndex(-1)}
                                    onClick={() => {
                                        setBurgerClicked(false);
                                        props.updateSlideIndex(index);
                                        if (location.pathname !== "/") {
                                            history.goBack();
                                        }
                                    }}
                                >
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
            </div>
            {location.pathname !== "/" && (
                <animated.div style={backButtonTranslate}>
                    <BiArrowBack
                        onClick={() => history.goBack()}
                        className={`backButton ${
                            location.pathname === "/projects"
                                ? "backButtonWhite"
                                : ""
                        } ${
                            props.changeHeaderBackIconToBlack
                                ? "backButtonBlack"
                                : "backButtonWhite"
                        }`}
                    />
                </animated.div>
            )}
        </nav>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        changeHeaderBackIconToBlack: state.changeHeaderBackIconToBlack,
    };
};

export default connect(mapStateToProps, {
    updateSlideIndex,
})(Header);
