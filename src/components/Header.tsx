import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import { updateSlideIndex } from "../actions";
import { connect } from "react-redux";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import { useLocation } from "react-router-dom";
import history from "../browserHistory";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineLinkedin, AiOutlineFile } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
//@ts-ignore because of  https://github.com/facebook/create-react-app/issues/8021
import Pdf from "../doc/resume.pdf";
import { StoreState } from "../reducers";

const titles = [
    "About Me",
    "My Startup",
    "Habanero",
    "Projects",
    "Career Timeline",
    "Contact",
];

interface HeaderProps {
    updateSlideIndex: any;
    changeHeaderBackIconToBlack: boolean;
    loadingStatus: boolean;
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
        transform:
            !props.loadingStatus && isBackButtonVisible
                ? "translate3d(0% , 0%, 0px)"
                : "translate3d(-100% , 0%, 0px)",

        config: {
            tension: 120,
            friction: 20,
        },
    });

    return (
        <nav>
            <div className="header__name-and-icons">
                <h4
                    className="header__name-and-icons-name"
                    onClick={() => {
                        history.push("/");
                    }}
                >
                    Matthew Francis
                </h4>
                <div className="header__name-and-icons-icons">
                    <a href={Pdf} rel="noopener noreferrer" target="_blank">
                        <AiOutlineFile className="header__name-and-icons-icon" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/matthew-francis-b9b1b31a2/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <AiOutlineLinkedin className="header__name-and-icons-icon" />
                    </a>
                    <a
                        href="https://github.com/mattfrancis888"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiGithub className="header__name-and-icons-icon" />
                    </a>
                    <div
                        className="header__name-and-icons-burger"
                        onClick={() => setBurgerClicked(!isBurgerClicked)}
                    >
                        <animated.div
                            className="header__name-and-icons-burger--first-line"
                            style={firstLineRotate}
                        ></animated.div>
                        <animated.div
                            className="header__name-and-icons-burger--second-line"
                            style={secondLineRotate}
                        ></animated.div>
                    </div>
                </div>
                <animated.div
                    className="header__name-and-icons-burger-dropdown"
                    style={dropdownControl}
                >
                    {titles.map((title, index) => {
                        return (
                            <animated.div
                                key={index}
                                className="header__name-and-icons-burger-dropdown-title"
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
                        className={`back__button ${
                            location.pathname === "/projects"
                                ? "back__button--white"
                                : ""
                        } ${
                            props.changeHeaderBackIconToBlack &&
                            location.pathname !== "/projects"
                                ? "back__button--black"
                                : "back__button--white"
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
        loadingStatus: state.loadingStatus,
    };
};

export default connect(mapStateToProps, {
    updateSlideIndex,
})(Header);
