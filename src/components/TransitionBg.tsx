import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import { AiTwotoneRightSquare } from "react-icons/ai";
import { fetchSlideIndex } from "../actions";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
interface TransitionBgProps {
    carousel: any;
}
const TransitionBg: React.FC<TransitionBgProps> = (props) => {
    const [slideIndex, setSlideIndex] = useState(0);
    // const minimize = useSpring({
    //     width: renderOverlay ? "0%" : "100%",
    //     config: {
    //         duration: 1000,
    //         mass: 10,
    //         tension: 550,
    //         friction: 140,
    //     },
    // });

    useEffect(() => {
        setSlideIndex(props.carousel.carousel);
        console.log(props.carousel.carousel);
    }, [props.carousel]);

    const minimize = useTransition(slideIndex, {
        from: {
            width: "100%",
        },
        enter: {
            width: "0%",
        },

        config: {
            mass: 1,
            duration: 1000,
            tension: 200,
            friction: 50,
        },
    });

    return (
        <React.Fragment>
            {minimize((animation, item) => {
                return (
                    <animated.div style={animation} className="transitionDark">
                        <div className="transitionRed"></div>
                    </animated.div>
                );
            })}
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        carousel: state,
    };
};

export default connect(mapStateToProps, {
    fetchSlideIndex,
})(TransitionBg);
