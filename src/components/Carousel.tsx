import React, { useState, useEffect, useCallback, useRef } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import useScrollDirection from "../useScrollDirection";

import { useTransition, animated, useSpring, useTrail } from "react-spring";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { useMeasure } from "react-use";
import { updateSlideIndex } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import SlideContent from "./SlideContent";
import _ from "lodash";
import me1 from "../img/me1.jpg";
import contact from "../img/contact.jpg";
import Loading from "./Loading";
import ow2 from "../img/ow2.jpg";
import career from "../img/career.jpg";
import habanerHome from "../img/habanero-home.jpg";
import bobbyhill from "../img/bobbyhill.jpg";
export const SLIDE_ABOUT_ME_DESC =
    "Software Development Engineer II at Lightspeed. BSc Computer Science at Wilfrid Laurier University. Co-Founder of Starty.";
export const STARTUP_DESC = `Starty is a platform for people to collaborate. Collaborating with accelerator and team to challenge decisions, address market research and pivot on ideas.`;
export const WORK_PROJECTS_DESC =
    "Holiday recipes from employees in Habanero shared to over a dozen of clients such as Suncor & Petro-Canada.";
export const SLIDE_PROJECTS_DESC =
    "Websites I've built (Kijij, Netflix, Steam, Overwatch and many more)";
export const SLIDE_CAREER_DESC = "Why I'm a valuable asset to your team";

export const slides = [
    { imgSrc: me1, title: "Matthew Francis", desc: SLIDE_ABOUT_ME_DESC },
    {
        imgSrc: bobbyhill,
        title: `My Startup`,
        desc: STARTUP_DESC,
    },
    {
        imgSrc: habanerHome,
        title: `Habanero`,
        desc: WORK_PROJECTS_DESC,
    },
    {
        imgSrc: ow2,
        title: "Projects",
        desc: SLIDE_PROJECTS_DESC,
    },

    {
        imgSrc: career,
        title: "Career Timeline",
        desc: SLIDE_CAREER_DESC,
    },
    { imgSrc: contact, title: "Get In Touch", desc: "" },
];

interface EmblaCarouselProps {
    updateSlideIndex: any;
    carouselSlideIndex: any;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = (props) => {
    const [loadedImages, setLoadedImages] = useState(0);
    const [showDotText, setShowDotText] = useState(false);
    const prevRef = useRef<any>();
    const nextRef = useRef<any>();

    const [slideIndex, setSlideIndex] = useState<any>(-1);
    const scrollTranslate = useTransition(slideIndex, {
        from: {
            transform: "translate3d(0px,100vh,0px) rotate(90deg)",
        },
        enter: {
            transform: "translate3d(0px,30vh,0px) rotate(90deg)",
        },
        leave: {
            transform: "translate3d(0px,100vh,0px) rotate(90deg)",
        },

        config: {
            mass: 1,
            tension: 50,
            friction: 35,
        },
    });

    const debounce = useCallback(
        _.debounce(
            (event) => {
                if (prevRef && event.deltaY < 0) {
                    if (nextRef.current) prevRef.current.click();
                    return;
                }
                if (nextRef && event.deltaY > 0) {
                    if (nextRef.current) nextRef.current.click();
                    return;
                }
            },
            250,
            { leading: true, trailing: false }
        ),
        []
    );

    //Without trailing, it will be executed twice:
    //https://stackoverflow.com/questions/53870969/lodash-throttle-prevent-function-from-being-called-an-extra-time-after-delay
    const throttle = useCallback(
        _.throttle(
            (event) => {
                if (prevRef && event.deltaY < 0) {
                    if (nextRef.current) prevRef.current.click();
                    return;
                }
                if (nextRef && event.deltaY > 0) {
                    if (nextRef.current) nextRef.current.click();
                    return;
                }
            },
            1500,
            { trailing: false }
        ),
        []
    );

    window.addEventListener("wheel", (event) => {
        debounce(event);
        // throttle(event);
    });
    const [carouselStartIndex, setCarouselStartIndex] = useState(0);
    useEffect(() => {
        //Useful for when user clics on back button from detail page
        setCarouselStartIndex(props.carouselSlideIndex);
    }, []);
    const [viewportRef, embla] = useEmblaCarousel({
        axis: "y",
        draggable: false,
        startIndex: carouselStartIndex,
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const scrollTo = useCallback(
        (index) => embla && embla.scrollTo(index),
        [embla]
    );

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
        //For Burger Drodpown
        itemEls.current[props.carouselSlideIndex]?.click();
        setSlideIndex(props.carouselSlideIndex);
    }, [props.carouselSlideIndex]);

    const dotTextTrail = useTrail(slides.length, {
        paddingRight: showDotText ? `2rem` : `0rem`,
        paddingLeft: showDotText ? `2rem` : `0rem`,
        config: {
            duration: 100,
        },
    });
    return (
        <React.Fragment>
            <Loading imagesToLoad={slides.length} loadedImages={loadedImages} />
            <div className="embla">
                <div className="embla__viewport" ref={viewportRef}>
                    <div className="embla__container">
                        {slides.map((slide, index) => {
                            return (
                                <div key={index} className="embla__slide">
                                    <div className="slide-inner">
                                        <div
                                            className="content-slide"
                                            onLoad={() => {
                                                setLoadedImages(
                                                    loadedImages + 1
                                                );
                                            }}
                                        >
                                            <SlideContent
                                                slideIndex={index}
                                                imgSrc={slide.imgSrc}
                                                title={slide.title}
                                                desc={slide.desc}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {scrollTranslate((animation, item) => {
                    return (
                        item === 0 && (
                            <animated.div
                                className="scrolldown-landing"
                                style={animation}
                            >
                                <h1>Scroll Down</h1>
                                <div className="scrolldown-landing--block"></div>
                            </animated.div>
                        )
                    );
                })}

                <div className="carousel__dots-and-button">
                    <button
                        className="embla__button embla__button--pre carousel__next-prev-button--hide"
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
                        <RiArrowUpSLine />
                    </button>
                    <div
                        className="embla__dots carousel__dots-and-button-dots"
                        onMouseEnter={() => setShowDotText(true)}
                        onMouseLeave={() => setShowDotText(false)}
                        onClick={() => setShowDotText(false)}
                    >
                        {dotTextTrail.map((animation, index) => (
                            <React.Fragment>
                                <div
                                    key={index}
                                    className="carousel__dots-and-button-dots-inner"
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
                                        } carousel__dots-and-button-dots-inner-dot`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // setTimeout(() => {
                                            //     props.updateSlideIndex(index);
                                            // }, 0);
                                            scrollTo(index);
                                            props.updateSlideIndex(index);
                                        }}
                                    ></animated.div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <button
                        className="embla__button embla__button--next carousel__next-prev-button--hide"
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
                </div>
            </div>
        </React.Fragment>
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
