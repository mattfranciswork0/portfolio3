import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import { AiTwotoneRightSquare } from "react-icons/ai";
import { updateSlideIndex } from "../actions";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
interface TransitionBgProps {
    carouselSlideIndex: any;
}
const FIRST_SLIDE = 0;
const LAST_SLIDE = 3;
const TransitionBg: React.FC<TransitionBgProps> = (props) => {
    const [slideIndex, setSlideIndex] = useState<any>(-1);

    useEffect(() => {
        setSlideIndex(props.carouselSlideIndex);
    }, [props.carouselSlideIndex]);

    const minimize = useTransition(slideIndex, {
        from: {
            width: "100%",
        },
        enter: {
            width: "0%",
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
        },

        config: {
            mass: 1,
            duration: 200,
            tension: 200,
            friction: 50,
        },
    });

    // {redExpand((animation, item) => {
    //     <animated.div
    //         style={animation}
    //         className="transitionRed"
    //     ></animated.div>;
    // })}

    return (
        <React.Fragment>
            {minimize((animation, item) => {
                return (
                    (item === FIRST_SLIDE || item === LAST_SLIDE) && (
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
                    )
                );
            })}
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
})(TransitionBg);
