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

interface SlideLandingProps {
    carouselSlideIndex: any;
}
const SlideLanding: React.FC<SlideLandingProps> = (props) => {
    const { width } = useWindowDimensions();
    return (
        <React.Fragment>
            <animated.div className="contentSlideContainer">
                <SlideContent
                    imgSrc={me1}
                    title="Matthew Francis"
                    desc="BSc Computer Science, 3rd Year Student, Wilfrid Laurier University"
                />

                {/* <div className="scrollDownWrap">
                    <h1>Scroll Down</h1>
                    <div className="scrollDownBlock"></div>
                </div> */}
            </animated.div>
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
})(SlideLanding);
