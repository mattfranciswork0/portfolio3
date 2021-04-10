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
                    imgSrc={
                        "https://cdn.statically.io/img/images.wallpapersden.com/image/download/overwatch-2-4k-8k_67463_1920x1080.jpg"
                    }
                    title="Projects"
                    desc="Websites I've built"
                />
            </div>
        </React.Fragment>
    );
};

export default SlideProjects;
