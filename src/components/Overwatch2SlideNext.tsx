import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import useWindowDimensions from "../windowDimensions";
import Overwatch2SlideExplore from "./Overwatch2SlideExplore";
import Overwatch2Carousel from "./Overwatch2Carousel";
import {
    LG_SCREEN_SIZE,
    XL_SCREEN_SIZE,
    MED_SCREEN_SIZE,
    SM_SCREEN_SIZE,
} from "../constants";
import contact from "../img/contact.jpg";
import TransitionBg from "./TransitionBg";
const timer = 3000;

const Overwatch2: React.FC<{}> = () => {
    const { width } = useWindowDimensions();
    return (
        <React.Fragment>
            <div className="overwatch2SlideParentContainer ">
                <animated.div className="overwatch2NextSlideContainer">
                    <div className="contentImageAndTextWrap">
                        <div className="contactImage">
                            <img src={contact} alt="" />
                            <TransitionBg />
                        </div>
                        <div className="contactTextWrap">
                            <h1 className="getInTouchTitle">Get in touch</h1>
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
                        </div>
                    </div>
                </animated.div>
            </div>
        </React.Fragment>
    );
};

export default Overwatch2;
