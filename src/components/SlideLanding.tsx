import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import SlideContent from "./SlideContent";
import { StoreState } from "../reducers";
import {
    LG_SCREEN_SIZE,
    XL_SCREEN_SIZE,
    MED_SCREEN_SIZE,
    SM_SCREEN_SIZE,
} from "../constants";
import { updateSlideIndex } from "../actions";
import { connect } from "react-redux";
import useWindowDimensions from "../windowDimensions";
import me1 from "../img/me1.jpg";
import me2 from "../img/me2.jpg";
const timer = 3000;
//const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
//@ts-ignore
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
//@ts-ignore
const podTrans1 = (x, y, z) => `translate3d(${x}px,${y}px,${z}px)`;

const SlideLanding: React.FC<{}> = () => {
    const [xHook, setX] = useState(0);
    const [yHook, setY] = useState(0);
    const { width } = useWindowDimensions();
    return (
        <React.Fragment>
            <animated.div className="contentSlideContainer">
                <SlideContent
                    imgSrc={me1}
                    title="Matthew Francis"
                    desc="BSc Computer Science, 3rd Year Student, Wilfrid Laurier University"
                />
                {/* <div
                                onMouseMove={({ clientX: x, clientY: y }) => {
                                    setX(x - window.innerWidth / 2);
                                    setY(y - window.innerHeight / 2);
                                    //Code below does not work, so I used hooks above
                                    // xy.to((xy) => [x, y])
                                }}
                                style={{
                                    transform:
                                        width >= MED_SCREEN_SIZE
                                            ? trans1(xHook, yHook)
                                            : "translate3d(0px,0px,0px)",
                                }}
                            ></div> */}
            </animated.div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        carouselSlideIndex: state,
    };
};

export default connect(mapStateToProps, {
    updateSlideIndex,
})(SlideLanding);
