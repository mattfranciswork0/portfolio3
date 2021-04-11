import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import useWindowDimensions from "../windowDimensions";
import SlideContent from "./SlideContent";
const timer = 3000;

const SlideProjects: React.FC<{}> = () => {
    const { width } = useWindowDimensions();
    return (
        <React.Fragment>
            <div className="contentSlideContainer">
                <SlideContent
                    // imgSrc={
                    //     "https://cdn.statically.io/img/images.wallpapersden.com/image/download/overwatch-2-4k-8k_67463_1920x1080.jpg"
                    // }
                    imgSrc={
                        "https://miro.medium.com/max/1400/1*nAZueDDk8s5ggBsxmkqfXg.jpeg"
                    }
                    // imgSrc={
                    //     "https://www.techpowerup.com/img/iV49uN1wYR7O8Mqw.jpg"
                    // }
                    title="Projects"
                    desc="Websites I've built (Kijij, Netflix, Steam, Overwatch and many more)"
                />
            </div>
        </React.Fragment>
    );
};

export default SlideProjects;
