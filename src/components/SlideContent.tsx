import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import { AiTwotoneRightSquare } from "react-icons/ai";
import { updateSlideIndex } from "../actions";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import history from "../browserHistory";
import contact from "../img/contact.jpg";
import me1 from "../img/me1.jpg";
import { slides } from "./Carousel";
interface SlideContentProps {
    carouselSlideIndex: any;
    title: string;
    desc: string;
    imgSrc: any;
    slideIndex?: number; //the index of the slide, different from carouselSlideIndex, which is the current slide index the carousel is at
    loadingStatus: boolean;
}
// const MIN_DELAY = 280;
const MIN_DELAY = 0;
const FIRST_SLIDE = 0;
const SECOND_SLIDE = 1;
const THIRD_SLIDE = 2;
const FOURTH_SLIDE = 3;
const FIFTH_SLIDE = 4;
const LAST_SLIDE = 5;
// const LAST_SLIDE = slides.length - 1;
const SlideContent: React.FC<SlideContentProps> = (props) => {
    const [carouselSlideIndex, setCarouselSlideIndex] = useState<any>(-1);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    useEffect(() => {
        if (!props.loadingStatus)
            setCarouselSlideIndex(props.carouselSlideIndex);
    }, [props.carouselSlideIndex, props.loadingStatus]);

    const minimize = useTransition(carouselSlideIndex, {
        from: {
            width: "100%",
        },
        enter: {
            width: "0%",
            delay: MIN_DELAY,
        },
        leave: {
            width: "0%",
        },

        config: {
            mass: 1,
            duration: 1000,
            // tension: 200,
            // friction: 50,
        },
    });

    const redExpand = useTransition(carouselSlideIndex, {
        from: {
            width: "0%",
        },
        enter: {
            width: "35%",
            delay: MIN_DELAY + 100,
        },

        config: {
            mass: 1,
            tension: 200,
            friction: 50,
        },
    });
    //Removed animation for image because it requests a new image whenever it's animated.
    //Not good for slower connections like 3G.
    const imgTranslate = useTransition(carouselSlideIndex, {
        from: {
            // transform: "translate3d(50%,0px,0px) scale(0.7)",
            transform: "scale(0.7)",
        },
        enter: {
            // transform: "translate3d(0px,0px,0px) scale(1)",
            transform: "scale(1)",
            delay: MIN_DELAY,
        },

        // leave: {
        //     transform: "scale(0.7)",
        // },
        config: {
            mass: 1,
            tension: 300,
            friction: 100,
        },
    });

    const titleTranslate = useTransition(carouselSlideIndex, {
        from: {
            transform: "translate3d(-125%,0%,0px)",
        },
        enter: {
            transform: "translate3d(0px,0px,0px)",
            delay: MIN_DELAY,
        },
        config: {
            mass: 1,
            tension: 300,
            friction: 100,
        },
    });
    const descAndRedBlockTranslate = useTransition(carouselSlideIndex, {
        from: {
            transform: "translate3d(-120%,0px,0px) ",
        },
        enter: {
            transform: "translate3d(0px,0px,0px)",

            delay: 600,
        },
        config: {
            tension: 200,
            friction: 50,
        },
    });

    const buttonTranslate = useTransition(carouselSlideIndex, {
        from: {
            transform: "translate3d(-120%,0px,0px) ",
        },
        enter: {
            transform: "translate3d(0px,0px,0px)",

            delay: 600,
        },
        config: {
            tension: 200,
            friction: 50,
        },
    });

    const buttonHover = useSpring({
        transform: isButtonHovered
            ? "translate3d(0px,10%,0px) "
            : "translate3d(0px,0px,0px)",

        config: {
            tension: 200,
            friction: 50,
        },
    });

    const currrentSlideNumberTranslate = useTransition(carouselSlideIndex, {
        from: {
            transform: "translate3d(0%,200%,0px) ",
        },
        enter: {
            transform: "translate3d(0px,0px,0px)",
        },

        // leave: {
        //     transform: "scale(0.7)",
        // },
        config: {
            mass: 1,
            tension: 120,
            friction: 50,
        },
    });

    return (
        <React.Fragment>
            <div className="content-slide__image-and-text">
                <div
                    // style={item === props.slideIndex ? animation : {}}
                    className="content-slide__image-and-text-image"
                >
                    <img src={props.imgSrc} alt="" />
                    {currrentSlideNumberTranslate((animation, item) => {
                        return (
                            item === props.slideIndex && (
                                <animated.h1
                                    style={animation}
                                    className="current-slide-number"
                                >
                                    {item + 1}/{slides.length}
                                </animated.h1>
                            )
                        );
                    })}

                    {minimize((animation, item) => {
                        return (
                            item === props.slideIndex && (
                                <animated.div
                                    style={animation}
                                    className="transition--dark"
                                >
                                    {redExpand((animation, item) => {
                                        return (
                                            item === props.slideIndex && (
                                                <animated.div
                                                    style={animation}
                                                    className="transition--red"
                                                ></animated.div>
                                            )
                                        );
                                    })}
                                </animated.div>
                            )
                        );
                    })}
                </div>

                <div className="content-slide__image-and-text-text">
                    {titleTranslate((animation, item) => {
                        return (
                            item === props.slideIndex && (
                                <animated.h1
                                    className="content-slide__image-and-text-text-title"
                                    style={animation}
                                >
                                    {props.title}
                                </animated.h1>
                            )
                        );
                    })}

                    {descAndRedBlockTranslate((animation, item) => {
                        return (
                            item === props.slideIndex && (
                                <animated.div
                                    className="red-blocks"
                                    style={animation}
                                >
                                    <div className="red-blocks--first-block firstRedBlock"></div>
                                    <div className="red-blocks--first-block red-blocks--second-block"></div>
                                </animated.div>
                            )
                        );
                    })}

                    {carouselSlideIndex !== LAST_SLIDE &&
                        descAndRedBlockTranslate((animation, item) => {
                            return (
                                item === props.slideIndex && (
                                    <animated.h3
                                        style={animation}
                                        className="content-slide__image-and-text-text-desc"
                                    >
                                        {props.desc}
                                    </animated.h3>
                                )
                            );
                        })}

                    {/* {carouselSlideIndex !== LAST_SLIDE &&
                        carouselSlideIndex !== SECOND_SLIDE && */}
                    {carouselSlideIndex === SECOND_SLIDE &&
                        buttonTranslate((animation, item) => {
                            return (
                                item === props.slideIndex && (
                                    <animated.div style={animation}>
                                        <a
                                            href={
                                                "https://bobbyhill-prod.herokuapp.com/"
                                            }
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <animated.button
                                                onMouseOver={() => {
                                                    setIsButtonHovered(true);
                                                }}
                                                onMouseLeave={() => {
                                                    setIsButtonHovered(false);
                                                }}
                                                style={buttonHover}
                                                className="content-slide__show-more-button"
                                                onClick={() => {
                                                    if (
                                                        carouselSlideIndex ===
                                                        FIRST_SLIDE
                                                    )
                                                        history.push("/me");
                                                    else if (
                                                        carouselSlideIndex ===
                                                        THIRD_SLIDE
                                                    )
                                                        history.push(
                                                            "/habanero"
                                                        );
                                                    else if (
                                                        carouselSlideIndex ===
                                                        FOURTH_SLIDE
                                                    )
                                                        history.push(
                                                            "/projects"
                                                        );
                                                    else if (
                                                        carouselSlideIndex ===
                                                        FIFTH_SLIDE
                                                    )
                                                        history.push("/career");
                                                }}
                                            >
                                                Visit
                                            </animated.button>
                                        </a>
                                    </animated.div>
                                )
                            );
                        })}

                    {carouselSlideIndex !== LAST_SLIDE &&
                        carouselSlideIndex !== SECOND_SLIDE &&
                        buttonTranslate((animation, item) => {
                            return (
                                item === props.slideIndex && (
                                    <animated.div style={animation}>
                                        <animated.button
                                            onMouseOver={() => {
                                                setIsButtonHovered(true);
                                            }}
                                            onMouseLeave={() => {
                                                setIsButtonHovered(false);
                                            }}
                                            style={buttonHover}
                                            className="content-slide__show-more-button"
                                            onClick={() => {
                                                if (
                                                    carouselSlideIndex ===
                                                    FIRST_SLIDE
                                                )
                                                    history.push("/me");
                                                else if (
                                                    carouselSlideIndex ===
                                                    THIRD_SLIDE
                                                )
                                                    history.push("/habanero");
                                                else if (
                                                    carouselSlideIndex ===
                                                    FOURTH_SLIDE
                                                )
                                                    history.push("/projects");
                                                else if (
                                                    carouselSlideIndex ===
                                                    FIFTH_SLIDE
                                                )
                                                    history.push("/career");
                                            }}
                                        >
                                            Show
                                        </animated.button>
                                    </animated.div>
                                )
                            );
                        })}

                    {carouselSlideIndex === LAST_SLIDE && (
                        <React.Fragment>
                            {descAndRedBlockTranslate((animation, item) => {
                                return (
                                    item === props.slideIndex && (
                                        <animated.div
                                            className="email-and-contact"
                                            style={animation}
                                        >
                                            <a
                                                className="mailto"
                                                href="mailto:mattfrancis888@gmail.com"
                                            >
                                                <h3 className="email">
                                                    Email:
                                                    mattfrancis888@gmail.com
                                                </h3>
                                            </a>

                                            <h3 className="contact">
                                                Phone: 289-772-7465
                                            </h3>
                                        </animated.div>
                                    )
                                );
                            })}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        carouselSlideIndex: state.carouselSlideIndex,
        loadingStatus: state.loadingStatus,
    };
};

export default connect(mapStateToProps, {
    updateSlideIndex,
})(SlideContent);
