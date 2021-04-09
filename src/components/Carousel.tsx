import React, { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import useScrollDirection from "../useScrollDirection";
import SlideLanding from "./SlideLanding";
import Overwatch2SlideExplore from "./Overwatch2SlideExplore";
import SlideContact from "./SlideContact";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { useMeasure } from "react-use";
import { updateSlideIndex } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import SlideCareer from "./SlideCareer";
//Instead of level up tuts / scott's way, you could use this for accordion : https://www.chrisberry.io/Animate-Auto-With-React-Spring/
//Much cleaner code

const slides = [
    { dotTitle: "Intro", component: <SlideLanding /> },
    { dotTitle: "Explore", component: <Overwatch2SlideExplore /> },
    { dotTitle: "Career", component: <SlideCareer /> },
    { dotTitle: "Contact", component: <SlideContact /> },
];

interface EmblaCarouselProps {
    updateSlideIndex: any;
}
const EmblaCarousel: React.FC<EmblaCarouselProps> = (props) => {
    const [showDotText, setShowDotText] = useState(false);
    //height auto the link above:
    // const defaultHeight = "0px";
    //const [ref, { width, left, right }] = useMeasure<any>();
    // The height of the content inside of the accordion
    // const [contentWidth, setContentWidth] = useState(defaultHeight);
    // const expand = useSpring({
    //     config: { friction: 10 },
    //     width: showDotText ? `${contentWidth}px` : defaultHeight,
    // });
    // useEffect(() => {
    //     //Sets initial height
    //     //@ts-ignore
    //     setContentWidth(width + left + right);

    //     //Adds resize event listener
    //     //@ts-ignore
    //     window.addEventListener("resize", setContentWidth(width + left * 2));

    //     // Clean-up
    //     //@ts-ignore
    //     return window.removeEventListener(
    //         "resize",
    //         //@ts-ignore
    //         setContentWidth(width + left * 2)
    //     );
    // }, [width]);

    const [viewportRef, embla] = useEmblaCarousel({
        axis: "y",
        draggable: false,
    });

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
        embla,
    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setSelectedIndex(embla.selectedScrollSnap());
    }, [embla, setSelectedIndex]);

    useEffect(() => {
        if (!embla) return;
        onSelect();

        setScrollSnaps(embla.scrollSnapList());
        embla.on("select", onSelect);
    }, [embla, setScrollSnaps, onSelect]);

    const dotTextTrail = useTrail(slides.length, {
        paddingRight: showDotText ? `2rem` : `0rem`,
        paddingLeft: showDotText ? `2rem` : `0rem`,
        // opacity: showDotText ? 1 : 0,

        config: {
            duration: 100,
        },
    });

    return (
        <div className="embla">
            <div className="embla__viewport" ref={viewportRef}>
                <div className="embla__container">
                    {slides.map((slide, index) => {
                        return (
                            <div key={index} className="embla__slide">
                                <div className="overwatch2SlideInner">
                                    {slide.component}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="overwatch2DotWrapAndButton">
                <div
                    className="embla__dots overwatch2DotWrap"
                    onMouseEnter={() => setShowDotText(true)}
                    onMouseLeave={() => setShowDotText(false)}
                    onClick={() => setShowDotText(false)}
                >
                    {dotTextTrail.map((animation, index) => (
                        <React.Fragment>
                            <div
                                key={index}
                                className="overwatch2DotParentWrap"
                            >
                                <animated.div
                                    style={animation}
                                    className={`embla__dot ${
                                        index === selectedIndex
                                            ? "is-selected dot-is-selected"
                                            : ""
                                    } overwatch2Dot`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.updateSlideIndex(index);
                                        scrollTo(index);
                                    }}
                                ></animated.div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                {/* 
                    <animated.div style={expand}>
                    <div ref={ref}>
                     <p >Hello </p>></div> 
                      <animated.div style={expand}>*/}
            </div>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        carouselSlideIndex: state,
    };
};

export default connect(mapStateToProps, {
    updateSlideIndex,
})(EmblaCarousel);
