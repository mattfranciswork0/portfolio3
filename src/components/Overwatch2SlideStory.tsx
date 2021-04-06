import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import useWindowDimensions from "../windowDimensions";
import { useMeasure } from "react-use";
const timer = 1000;

const stories = [
    {
        title: "The Omnic Crisis",
        desc: `The Omnica Corporation revolutionized robotic
        manufacturing with the creation of “omniums.” But the
        factories’ self-improving algorithms were fraught with
        malfunctions, and were eventually shut down. After a
        period of dormancy, the omniums reactivated, producing
        an army of highly-adaptable “omnics” that attacked
        humanity, beginning the Omnic Crisis. In response, many
        countries developed advanced defense initiatives, such
        as the United States’ Enhanced Soldier Program and
        Germany’s Crusaders.`,
    },
    {
        title: `Honor and Glory`,
        desc: `Reinhardt reflects on a decisive battle during the Omnic Crisis that led him to join Overwatch.`,
    },
    {
        title: `Overwatch Established`,
        desc: `As the conflict escalated, the United Nations recruited heroes from around the world to form “Overwatch.” Through a series of dangerous raids, Overwatch managed to shut down the omniums and win the war. For the next decades, Overwatch’s influence grew. In addition to military peacekeeping efforts, Overwatch pioneered scientific initiatives to eradicate epidemics, reverse ecological damage, and develop new breakthroughs in medicine. For many years, 
        the organization was a symbol of hope for the world.`,
    },
];

const Overwatch2SlideStory: React.FC<{}> = () => {
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
            <div className="overwatch2StoryContainer">
                {centerText((style, item) => {
                    return (
                        <animated.div
                            // style={style}
                            className="overwatch2StoryTextWrap"
                        >
                            <animated.div
                                style={style}
                                className="overwatch2StoryTextInnerWrap"
                            >
                                <h3 className="overwatch2StoryTitle">
                                    {stories[progress.storiesArrayIndex].title}
                                </h3>
                                <p className="overwatch2StoryDesc">
                                    {stories[progress.storiesArrayIndex].desc}
                                </p>
                            </animated.div>
                        </animated.div>
                    );
                })}

                <div className="overwatch2StoryTimelineContainer">
                    <div className="overwatch2StoryTimelineProgress overwatch2StoryTimelineProgressNotFilled"></div>
                    <animated.div
                        style={fill}
                        className="overwatch2StoryTimelineProgress"
                    ></animated.div>

                    <div className="overwatch2StoryTimelineProgressControl">
                        <div
                            onClick={() => {
                                setProgress({
                                    percentage: 25,
                                    storiesArrayIndex: 0,
                                });
                            }}
                            className="overwatch2StoryTimelineProgressControlSectionWrap"
                        >
                            <div className="overWatch2StoryTimelineProgressTitleAndImageWrap">
                                {fadeControlImages((style, item) => {
                                    return (
                                        item === 25 && (
                                            <animated.div
                                                className="overwatch2StoryTimelineControlImageWrap"
                                                style={style}
                                            ></animated.div>
                                        )
                                    );
                                })}

                                <p className="overWatch2StoryTimlineProgressTitle">
                                    Omnic Crisis
                                </p>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setProgress({
                                    percentage: 100,
                                    storiesArrayIndex: 2,
                                });
                            }}
                            className="overwatch2StoryTimelineProgressControlSectionWrap"
                        >
                            <div className="overWatch2StoryTimelineProgressTitleAndImageWrap">
                                {fadeControlImages((style, item) => {
                                    return (
                                        item === 100 && (
                                            <animated.div
                                                className="overwatch2StoryTimelineControlImageWrap"
                                                style={style}
                                            ></animated.div>
                                        )
                                    );
                                })}

                                <p className="overWatch2StoryTimlineProgressTitle">
                                    Overwatch Established
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Overwatch2SlideStory;
