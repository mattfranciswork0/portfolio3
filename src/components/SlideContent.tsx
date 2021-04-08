import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import { AiTwotoneRightSquare } from "react-icons/ai";
import { updateSlideIndex } from "../actions";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import contact from "../img/contact.jpg";
import me1 from "../img/me1.jpg";
interface SlideContentProps {
    carouselSlideIndex: any;
    title?: string;
    desc?: string;
    imgSrc: any;
}
const FIRST_SLIDE = 0;
const LAST_SLIDE = 3;
const SlideContent: React.FC<SlideContentProps> = (props) => {
    const [slideIndex, setSlideIndex] = useState<any>(-1);

    useEffect(() => {
        // if (
        //     props.carouselSlideIndex === FIRST_SLIDE ||
        //     props.carouselSlideIndex === LAST_SLIDE - 1 ||
        //     props.carouselSlideIndex === LAST_SLIDE
        // )
        setSlideIndex(props.carouselSlideIndex);
    }, [props.carouselSlideIndex]);

    const minimize = useTransition(slideIndex, {
        from: {
            width: "100%",
        },
        enter: {
            width: "0%",
            delay: 270,
        },
        leave: {
            width: "0%",
        },

        config: {
            mass: 1,
            duration: 1000,
            tension: 200,
            friction: 50,
        },
    });

    const redExpand = useTransition(slideIndex, {
        from: {
            width: "0%",
        },
        enter: {
            width: "30%",
            delay: 270,
        },

        config: {
            mass: 1,
            duration: 200,
            tension: 200,
            friction: 50,
        },
    });
    const titleTranslate = useTransition(slideIndex, {
        from: {
            transform: "translate3d(-100px,0px,0px)",
        },
        enter: {
            transform: "translate3d(0px,0px,0px)",
        },
        config: {
            duration: 1000,
        },
    });
    const descTranslate = useTransition(slideIndex, {
        from: {
            transform: "translate3d(-100px,0px,0px)",
        },
        enter: {
            transform: "translate3d(0px,0px,0px)",
            delay: 1000,
        },
        config: {
            duration: 1000,
        },
    });

    return (
        <React.Fragment>
            <div className="contentImageAndTextWrap">
                <div className="contentImage">
                    <img src={props.imgSrc} alt="" />
                    {minimize((animation, item) => {
                        return (
                            <animated.div
                                style={animation}
                                className="transitionDark"
                            >
                                {redExpand((animation, item) => {
                                    return (
                                        <animated.div
                                            style={animation}
                                            className="transitionRed"
                                        ></animated.div>
                                    );
                                })}
                            </animated.div>
                        );
                    })}
                </div>
                <div className="contentTextWrap">
                    {titleTranslate((animation, item) => {
                        return (
                            <animated.h1
                                className="contentTitle"
                                style={animation}
                            >
                                {props.title}
                            </animated.h1>
                        );
                    })}

                    {slideIndex !== LAST_SLIDE &&
                        descTranslate((animation, item) => {
                            return (
                                <animated.h3
                                    style={animation}
                                    className="contentDesc"
                                >
                                    {props.desc}
                                </animated.h3>
                            );
                        })}

                    {slideIndex === LAST_SLIDE && (
                        <React.Fragment>
                            <a
                                className="mailto"
                                href="mailto:mattfrancis888@gmail.com"
                            >
                                <h3 className="email">
                                    Email: mattfrancis888@gmail.com
                                </h3>
                            </a>

                            <h3 className="contactPhone">
                                Phone: 289-772-7465
                            </h3>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        carouselSlideIndex: state.carouselSlideIndex,
    };
};

export default connect(mapStateToProps, {
    updateSlideIndex,
})(SlideContent);
