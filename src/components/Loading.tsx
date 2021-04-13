import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import { updateSlideIndex } from "../actions";
import { connect } from "react-redux";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import { useLocation } from "react-router-dom";
import history from "../browserHistory";
import { BiArrowBack } from "react-icons/bi";
import { StoreState } from "../reducers";
import { updateLoadingStatus } from "../actions";
interface LoadingProps {
    imagesToLoad: number;
    loadedImages: number;
    updateLoadingStatus(isLoading: boolean): void;
}
const Loading: React.FC<LoadingProps> = (props) => {
    const [isImagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        //Currently loading images
        props.updateLoadingStatus(true);
    }, []);

    useEffect(() => {
        if (props.imagesToLoad === props.loadedImages) {
            setImagesLoaded(true);
            //Stopped Loading
            props.updateLoadingStatus(false);
        }
    }, [props, props.loadedImages]);

    const loadingTranslate = useSpring({
        height: isImagesLoaded ? "0vh" : "100vh",
        // height: isImagesLoaded ? "100vh" : "100vh",
        config: {
            friction: 20,
            tension: 120,
        },
    });

    const loadingTextDissapear = useSpring({
        display: isImagesLoaded ? "none" : "block",

        // display: isImagesLoaded ? "block" : "block",

        config: {
            friction: 20,
            tension: 120,
        },
    });

    return (
        <animated.div style={loadingTranslate} className="loadingContainer">
            <animated.h1 style={loadingTextDissapear}>
                Matthew Francis
            </animated.h1>
        </animated.div>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        // carouselSlideIndex: state.carouselSlideIndex,
    };
};

export default connect(mapStateToProps, {
    updateLoadingStatus,
})(Loading);
