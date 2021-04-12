import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import useWindowDimensions from "../windowDimensions";
import contact from "../img/contact.jpg";
import SlideContent from "./SlideContent";
const timer = 3000;

const SlideContact: React.FC<{}> = () => {
    const { width } = useWindowDimensions();
    return (
        <React.Fragment>
            <div className="contentSlideContainer">
                <SlideContent imgSrc={contact} title="Get In Touch" desc="" />
            </div>
        </React.Fragment>
    );
};

export default SlideContact;
