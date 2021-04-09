import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import useWindowDimensions from "../windowDimensions";
import contact from "../img/contact.jpg";
import SlideContent from "./SlideContent";
const timer = 3000;

const Overwatch2: React.FC<{}> = () => {
    const { width } = useWindowDimensions();
    return (
        <React.Fragment>
            <div className="overwatch2SlideParentContainer  ">
                <div className="contentSlideContainer">
                    <SlideContent
                        imgSrc={contact}
                        title="Matthew Francis"
                        desc="Bsc"
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Overwatch2;
