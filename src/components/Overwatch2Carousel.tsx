import React, { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import useScrollDirection from "../useScrollDirection";
import Overwatch2SlideLanding from "./Overwatch2SlideLanding";
import Overwatch2SlideExplore from "./Overwatch2SlideExplore";
import Overwatch2SlideStory from "./Overwatch2SlideStory";
import Overwatch2SlideNext from "./Overwatch2SlideNext";
import Overwatch2SlideExploreDetails from "./Overwatch2SlideExploreDetails";
import { useTransition, animated, useSpring, useTrail } from "react-spring";

import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

import { useMeasure } from "react-use";

//Instead of level up tuts / scott's way, you could use this for accordion : https://www.chrisberry.io/Animate-Auto-With-React-Spring/
//Much cleaner code

//@ts-ignore
// export const DotButton = React.forwardRef(
//     ({ style, selected, onClick }, ref) => (
//         <React.Fragment>
//             <animated.div style={style} className="overwatch2DotBackground">
//                 <p ref={ref} className="overwatch2DotText">
//                     Story
//                 </p>
//                 <div
//                     className={`embla__dot ${
//                         selected ? "is-selected" : ""
//                     } overwatch2Dot`}
//                     // type="button"
//                     onClick={onClick}
//                 ></div>
//             </animated.div>

//             {/* <Overwatch2DotAccordion toggle={toggle} /> */}
//         </React.Fragment>
//     )
// );

//@ts-ignore
export const PrevButton = ({ enabled, onClick }) => (
    <button
        className="embla__button embla__button--prev overwatch2CarouselButton"
        onClick={onClick}
        disabled={!enabled}
    >
        <RiArrowUpSLine className="overwatch2CarouselArrow" />
    </button>
);

//@ts-ignore
export const NextButton = ({ enabled, onClick }) => (
    <button
        className="embla__button embla__button--next overwatch2CarouselButton"
        onClick={onClick}
        disabled={!enabled}
    >
        <RiArrowDownSLine className="overwatch2CarouselArrow" />
    </button>
);

// const slides = [
//     "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
//     "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
//     "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
// ];

const slides = [
    { dotTitle: "Intro", component: <Overwatch2SlideLanding /> },
    { dotTitle: "Explore", component: <Overwatch2SlideExplore /> },
    { dotTitle: "Career", component: <Overwatch2SlideStory /> },
    // { dotTitle: "What's Next", component: <Overwatch2SlideNext /> },
];

const EmblaCarousel = () => {
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

    const [viewportRef, embla] = useEmblaCarousel({ axis: "y" });
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

    // useEffect(() => embla && setupWheelGestures(embla), [embla]);

    useEffect(() => {
        if (!embla) return;
        onSelect();

        setScrollSnaps(embla.scrollSnapList());
        embla.on("select", onSelect);
    }, [embla, setScrollSnaps, onSelect]);

    const dotTextTrail = useTrail(slides.length, {
        paddingRight: showDotText ? `1rem` : `0rem`,
        paddingLeft: showDotText ? `1rem` : `0rem`,
        opacity: showDotText ? 1 : 0,

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
                            <div className="embla__slide" key={index}>
                                <div className="overwatch2SlideInner">
                                    {slide.component}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* <div className="embla__container">
                    <div className="embla__slide" key={0}>
                        <div className="embla__slide__inner">
                            <img
                                className="embla__slide__img"
                                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
                                alt=""
                            ></img>
                        </div>
                        Slide 2
                    </div>
                    <div className="embla__slide" key={1}>
                        <div className="embla__slide__inner">
                            <img
                                className="embla__slide__img"
                                src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
                                alt=""
                            ></img>
                        </div>
                        Slide 1
                    </div>
                </div> */}
            </div>
            <div className="overwatch2DotWrapAndButton">
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <div
                    className="embla__dots overwatch2DotWrap"
                    onMouseEnter={() => setShowDotText(true)}
                    onMouseLeave={() => setShowDotText(false)}
                >
                    {dotTextTrail.map((animation, index) => (
                        // <DotButton
                        //     style={animation}
                        //     key={index}
                        //     selected={index === selectedIndex}
                        //     onClick={() => scrollTo(index)}
                        //     ref={ref}
                        // />
                        <React.Fragment>
                            <div className="overwatch2DotParentWrap">
                                <animated.div
                                    style={animation}
                                    className="overwatch2DotBackground"
                                    onClick={() => scrollTo(index)}
                                >
                                    <p className="overwatch2DotText">
                                        {slides[index].dotTitle}
                                    </p>
                                </animated.div>
                                <div
                                    className={`embla__dot ${
                                        index === selectedIndex
                                            ? "is-selected"
                                            : ""
                                    } overwatch2Dot`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        scrollTo(index);
                                    }}
                                ></div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                {/* <div ref={ref}
                     <p >Hello </p>></div> */}

                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>
        </div>
    );
};

export default EmblaCarousel;
