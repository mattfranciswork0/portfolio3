import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import _ from "lodash";
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
        image:
            "https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/timeline/2560/omnic-crisis.jpg",
        fallbackImage:
            "https://res.cloudinary.com/du8n2aa4p/image/upload/v1617315414/blizzard/overwatch2/slide%203%20-%20story/omnic_lg.jpg",
    },
    {
        title: `Honor and Glory`,
        desc: `Reinhardt reflects on a decisive battle during the Omnic Crisis that led him to join Overwatch.`,
        image: `https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/timeline/2560/honor-and-glory.jpg`,
        fallbackImage:
            "https://res.cloudinary.com/du8n2aa4p/image/upload/v1617642996/blizzard/overwatch2/slide%203%20-%20story/honor_and_glory_lg.jpg",
    },
    {
        title: `Overwatch Established`,
        desc: `As the conflict escalated, the United Nations recruited heroes from around the world to form “Overwatch.” Through a series of dangerous raids, Overwatch managed to shut down the omniums and win the war. For the next decades, Overwatch’s influence grew. In addition to military peacekeeping efforts, Overwatch pioneered scientific initiatives to eradicate epidemics, reverse ecological damage, and develop new breakthroughs in medicine. For many years, 
        the organization was a symbol of hope for the world.`,
        image:
            "https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/timeline/2560/overwatch-established.jpg",
        fallbackImage:
            "https://res.cloudinary.com/du8n2aa4p/image/upload/v1617316075/blizzard/overwatch2/slide%203%20-%20story/overwatch_established_lg.jpg",
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
            width: "0%",
        },
        to: {
            width: `${progress.percentage}%`,
        },

        config: {
            duration: timer,
        },
    });

    const renderBackground = () => {
        return stories[progress.storiesArrayIndex].image;
    };
    return (
        <React.Fragment>
            <div className="overwatch2StoryContainer">
                {fadeBackground((style, index) => {
                    return (
                        <animated.img
                            style={style}
                            className="overwatch2StoryBackgroundImage"
                            src={renderBackground()}
                            alt="background"
                            onError={(e: any) => {
                                e.target.onError = null;
                                e.target.src = `${
                                    stories[progress.storiesArrayIndex]
                                        .fallbackImage
                                }`;
                            }}
                        />
                    );
                })}
                {/* Example of height auto animation
                <animated.div className="autoWrap" style={autoSpring}>
                    <div {...bind} className="overwatch2StoryTextWrap">
                        <h3 className="overwatch2StoryTitle">
                            {stories[progress.storiesArrayIndex].title}
                        </h3>
                        <p className="overwatch2StoryDesc">
                            {stories[progress.storiesArrayIndex].desc}
                        </p>
                    </div>
                </animated.div> */}

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
                                            >
                                                <img
                                                    src="https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/timeline/thumbnails/omnic-crisis.jpg"
                                                    alt=""
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        setProgress({
                                                            percentage: 25,
                                                            storiesArrayIndex: 0,
                                                        });
                                                    }}
                                                    onError={(e: any) => {
                                                        e.target.onError = null;
                                                        e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617315276/blizzard/overwatch2/slide%203%20-%20story/omnic-crisis.jpg`;
                                                    }}
                                                />
                                                <img
                                                    src="https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/timeline/thumbnails/honor-and-glory.jpg"
                                                    alt=""
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        setProgress({
                                                            percentage: 25,
                                                            storiesArrayIndex: 1,
                                                        });
                                                    }}
                                                    onError={(e: any) => {
                                                        e.target.onError = null;
                                                        e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617315572/blizzard/overwatch2/slide%203%20-%20story/honor-and-glory.jpg`;
                                                    }}
                                                />
                                            </animated.div>
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
                                            >
                                                <img
                                                    src="https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/timeline/thumbnails/overwatch-established.jpg"
                                                    alt=""
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        setProgress({
                                                            percentage: 25,
                                                            storiesArrayIndex: 2,
                                                        });
                                                    }}
                                                    onError={(e: any) => {
                                                        e.target.onError = null;
                                                        e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617315695/blizzard/overwatch2/slide%203%20-%20story/overwatch-established.jpg`;
                                                    }}
                                                />
                                            </animated.div>
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
