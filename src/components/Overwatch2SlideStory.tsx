import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import useWindowDimensions from "../windowDimensions";
import { useMeasure } from "react-use";
import { LG_SCREEN_SIZE } from "../constants";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { updateSlideIndex } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
const timer = 1000;

const stories = [
    {
        title: "2018 - Enrolled In University",

        desc: [
            `Enrolled for BSc Computer Science at Wilfrid Laurier's University, Canada.`,
        ],
    },
    {
        title: `2020 - Web Dev Lead For School's Comp Sci Club`,

        desc: [
            `Leading a group of individuals new to web development in creating a 'mock-site' for the club.`,
            `Held meetings to explain web development concepts and keep team on-track.`,
            `By constantly putting myself in the other person's "shoes";  I'm able to create good interpersonal relationships and
             communicate clearly.`,
        ],
    },
];
interface SlideStoryProps {
    carouselSlideIndex: any;
}

const SlideStory: React.FC<{}> = () => {
    const [progress, setProgress] = useState({
        percentage: 25,
        storiesArrayIndex: 0,
    });
    const { width } = useWindowDimensions();
    const [dropdownClicked, setDropdownClicked] = useState(false);

    const defaultHeight = "0px";
    const [ref, { height, top, bottom }] = useMeasure<any>();

    const [contentHeight, setContentHeight] = useState(defaultHeight);
    const expand = useSpring({
        config: { friction: 10 },
        height: dropdownClicked ? `${contentHeight}px` : defaultHeight,
    });
    useEffect(() => {
        //Sets initial height
        //@ts-ignore
        setContentHeight(height);

        //Adds resize event listener

        window.addEventListener(
            "resize",
            //@ts-ignore
            setContentHeight(height + top * 2)
        );

        // Clean-up
        //@ts-ignore
        return window.removeEventListener(
            "resize",
            //@ts-ignore
            setContentHeight(height + top * 2)
        );
    }, [height, top]);

    const rotateArrow = useSpring({
        transform: dropdownClicked ? "rotate(360deg)" : "rotate(270deg)",

        config: {
            duration: 250,
        },
    });

    const centerText = useTransition(progress.storiesArrayIndex, {
        from: {
            transform: "translate3d(0%,10%,0px)",

            // opacity: "0",
        },
        enter: {
            transform: "translate3d(0%,0%,0px)",
            // opacity: "1",
        },

        config: {
            mass: 1,
            duration: 300,
            tension: 200,
            friction: 50,
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

    const renderDropdown = () => {
        return (
            <div className="overwatch2SlideCurrentExploreDetailWrap">
                <p className="overwatch2SlideCurrentExploreDetailDropdownText">
                    Timeline
                    <animated.div
                        style={rotateArrow}
                        onMouseEnter={() => setDropdownClicked(true)}
                        onMouseLeave={() => setDropdownClicked(false)}
                        onClick={() => setDropdownClicked(!dropdownClicked)}
                    >
                        <RiArrowDownSLine className="overwatch2SlideCurrentExploreDetailArrowDown" />
                    </animated.div>
                </p>

                <animated.div
                    style={expand}
                    className="overwatch2SlideCurrentExploreDetailDropdown"
                    onMouseEnter={() => setDropdownClicked(true)}
                    onMouseLeave={() => setDropdownClicked(false)}
                    onClick={() => setDropdownClicked(!dropdownClicked)}
                >
                    <div ref={ref}>
                        {stories.map((story, index) => {
                            return (
                                <p
                                    key={index}
                                    onClick={() => {
                                        setProgress({
                                            percentage: index === 0 ? 25 : 100,
                                            storiesArrayIndex: index,
                                        });
                                    }}
                                >
                                    {story.title}
                                </p>
                            );
                        })}
                    </div>
                </animated.div>
            </div>
        );
    };

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

                {width < LG_SCREEN_SIZE && renderDropdown()}
                {width >= LG_SCREEN_SIZE && (
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
                )}
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
})(SlideStory);
