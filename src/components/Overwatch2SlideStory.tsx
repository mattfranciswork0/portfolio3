import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import useWindowDimensions from "../windowDimensions";
import { useMeasure } from "react-use";
const timer = 1000;

const stories = [
    {
        title: "2018 - Enrolled In University",

        desc: [
            `Enrolled for BSc Computer Science at,  Wilfrid Laurier's University, Canada.`,
        ],
    },
    {
        title: `2020 - Web Dev Lead For School's Comp Sci Club`,

        desc: [
            `Leading a group of individuals new to web development in creating a 'mock-site' for the club.`,
            `Held meetings to explain web development concepts and keep team on-track.`,
            `Grew as a 'leader' by constantly putting myself in the other person's "shoes"; by doing so, I'm able to create good interpersonal relationships and
             communicate clearly.`,
        ],
    },
];

const SlideStory: React.FC<{}> = () => {
    const [progress, setProgress] = useState({
        percentage: 25,
        storiesArrayIndex: 0,
    });

    //For height auto animation
    //@ts-ignore
    //const [bind, { height }] = useMeasure();
    // const autoSpring = useSpring({
    //     from: {
    //         overflow: "hidden",
    //         height: 0,
    //     },
    //     to: {
    //         height: height,
    //     },
    //     config: {
    //         duration: timer,
    //     },
    // });

    const centerText = useTransition(progress.storiesArrayIndex, {
        from: {
            transform: "translate3d(0%,0%,0px)",

            // opacity: "0",
        },
        enter: {
            transform: "translate3d(0%,-20%,0px)",
            // opacity: "1",
        },

        config: {
            mass: 1,
            duration: 300,
            tension: 200,
            friction: 50,
        },
    });

    const fadeBackground = useTransition(progress, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },

        config: {
            duration: timer,
        },
    });

    const fadeControlImages = useTransition(progress.percentage, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },

        config: {
            duration: timer,
        },
    });

    const fill = useSpring({
        from: {
            height: "0%",
        },
        to: {
            height: `${progress.percentage}%`,
        },

        config: {
            duration: timer,
        },
    });

    return (
        <React.Fragment>
            <div className="storyContainer">
                {centerText((style, item) => {
                    return (
                        <animated.div
                            // style={style}
                            className="storyTextWrap"
                        >
                            <animated.div
                                style={style}
                                className="storyTextInnerWrap"
                            >
                                <h3 className="storyTitle">
                                    {stories[progress.storiesArrayIndex].title}
                                </h3>
                                <ul className="storyDesc">
                                    {stories[
                                        progress.storiesArrayIndex
                                    ].desc.map((point, index) => {
                                        return <li>{point}</li>;
                                    })}
                                </ul>
                            </animated.div>
                        </animated.div>
                    );
                })}

                <div className="storyTimelineContainer">
                    <div className="storyTimelineProgress storyTimelineProgressNotFilled"></div>
                    <animated.div
                        style={fill}
                        className="storyTimelineProgress"
                    ></animated.div>

                    <div className="storyTimelineProgressControl">
                        <div
                            onClick={() => {
                                setProgress({
                                    percentage: 25,
                                    storiesArrayIndex: 0,
                                });
                            }}
                            className="storyTimelineProgressControlSectionWrap"
                        >
                            <div className="storyTimelineProgressTitleWrap">
                                <p className="storyTimelineProgressTitle">
                                    {stories[0].title}
                                </p>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setProgress({
                                    percentage: 100,
                                    storiesArrayIndex: 1,
                                });
                            }}
                            className="storyTimelineProgressControlSectionWrap"
                        >
                            <div className="storyTimelineProgressTitleWrap">
                                <p className="storyTimelineProgressTitle">
                                    {stories[1].title}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SlideStory;
