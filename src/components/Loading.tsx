import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import { updateSlideIndex } from "../actions";
import { connect } from "react-redux";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import { useLocation } from "react-router-dom";
import history from "../browserHistory";
import { BiArrowBack } from "react-icons/bi";
import { StoreState } from "../reducers";

interface LoadingProps {
    imagesToLoad: number;
    loadedImages: number;
}
const Loading: React.FC<LoadingProps> = (props) => {
    const [isImagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        if (props.imagesToLoad === props.loadedImages) setImagesLoaded(true);
    }, [props, props.loadedImages]);

    const loadingTranslate = useSpring({
        height: isImagesLoaded ? "0vh" : "100vh",

        config: {
            friction: 20,
            tension: 120,
        },
    });

    const loadingTextDissapear = useSpring({
        display: isImagesLoaded ? "none" : "block",

        config: {
            friction: 20,
            tension: 120,
        },
    });

    return (
        <animated.div style={loadingTranslate} className="loadingContainer">
            <animated.h1 style={loadingTextDissapear}>Loading</animated.h1>
        </animated.div>
    );
};

export default Loading;
