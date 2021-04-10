import React, { useState, useEffect, useCallback, useRef } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import useScrollDirection from "../useScrollDirection";
import SlideLanding from "./SlideLanding";
import SlideContact from "./SlideContact";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { useMeasure } from "react-use";
import { updateSlideIndex } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import SlideCareer from "./SlideCareer";
import SlideProjects from "./SlideProjects";
import _ from "lodash";
//Instead of level up tuts / scott's way, you could use this for accordion : https://www.chrisberry.io/Animate-Auto-With-React-Spring/
//Much cleaner code

const slides = [
    { dotTitle: "Intro", component: <SlideLanding /> },
    { dotTitle: "Explore", component: <SlideProjects /> },
    { dotTitle: "Career", component: <SlideCareer /> },
    { dotTitle: "Contact", component: <SlideContact /> },
];

interface EmblaCarouselProps {
    updateSlideIndex: any;
    carouselSlideIndex: any;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = (props) => {
    const [showDotText, setShowDotText] = useState(false);
    const prevRef = useRef<any>();
    const nextRef = useRef<any>();
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

    // window.addEventListener("wheel", (event) => {
    //     console.log(event);
    //     if (!didUserScroll === false && event.deltaY > 0) {
    //         setDidUserScroll(true);
    //         console.log("delta Y pos");
    //     } else if (didUserScroll === false && event.deltaY < 0) {
    //         setDidUserScroll(true);
    //         console.log("delta Y neg");
    //     }
    // });

    // const debounce = useCallback(
    //     _.debounce(
    //         () => {
    //             console.log("delta Y neg");
    //             //@ts-ignore
    //             if (nextRef.current) nextRef.current.click();
    //         },
    //         1000,
    //         { leading: true, trailing:false}
    //     ),
    //     []
    // );

    //Without trailing, it will be executed twice:
    //https://stackoverflow.com/questions/53870969/lodash-throttle-prevent-function-from-being-called-an-extra-time-after-delay
    const throttle = useCallback(
        _.throttle(
            (event) => {
                if (prevRef && event.deltaY < 0) {
                    if (nextRef.current) prevRef.current.click();
                }
                if (nextRef && event.deltaY > 0) {
                    if (nextRef.current) nextRef.current.click();
                }
            },
            1500,
            { trailing: false }
        ),
        []
    );

    window.addEventListener("wheel", (event) => {
        //debounce();
        throttle(event);
    });

    const [viewportRef, embla] = useEmblaCarousel({
        axis: "y",
        draggable: false,
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

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
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla, setSelectedIndex]);

    useEffect(() => {
        if (!embla) return;
        onSelect();

        setScrollSnaps(embla.scrollSnapList());
        embla.on("select", onSelect);
    }, [embla, setScrollSnaps, onSelect]);

    const itemEls = useRef(new Array());

    useEffect(() => {
        itemEls.current[props.carouselSlideIndex]?.click();
    }, [props.carouselSlideIndex]);

    const dotTextTrail = useTrail(slides.length, {
        paddingRight: showDotText ? `2rem` : `0rem`,
        paddingLeft: showDotText ? `2rem` : `0rem`,
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
                <button
                    className="embla__button embla__button--prev overwatch2CarouselButton carouselNextPrevButtonHide"
                    onClick={() => {
                        scrollPrev();
                        setTimeout(() => {
                            if (embla)
                                props.updateSlideIndex(
                                    embla.selectedScrollSnap()
                                );
                        }, 0);
                    }}
                    disabled={!prevBtnEnabled}
                    ref={prevRef}
                >
                    <RiArrowUpSLine className="overwatch2CarouselArrow" />
                </button>
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
                                    ref={(element) =>
                                        (itemEls.current[index] = element)
                                    }
                                    className={`embla__dot ${
                                        index === selectedIndex
                                            ? "is-selected dot-is-selected"
                                            : ""
                                    } overwatch2Dot`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // setTimeout(() => {
                                        //     props.updateSlideIndex(index);
                                        // }, 50);
                                        props.updateSlideIndex(index);
                                        scrollTo(index);
                                    }}
                                ></animated.div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <button
                    className="embla__button embla__button--next carouselNextPrevButtonHide"
                    onClick={() => {
                        scrollNext();
                        setTimeout(() => {
                            if (embla)
                                props.updateSlideIndex(
                                    embla.selectedScrollSnap()
                                );
                        }, 0);
                    }}
                    disabled={!nextBtnEnabled}
                    ref={nextRef}
                >
                    <RiArrowDownSLine className="overwatch2CarouselArrow" />
                </button>

                {/* <NextButton
                    onClick={scrollNext}
                    enabled={nextBtnEnabled}
                    ref={nextRef}
                /> */}
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
        carouselSlideIndex: state.carouselSlideIndex,
    };
};

export default connect(mapStateToProps, {
    updateSlideIndex,
})(EmblaCarousel);
