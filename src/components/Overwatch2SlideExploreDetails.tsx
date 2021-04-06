import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import _ from "lodash";
import useWindowDimensions from "../windowDimensions";
import Overwatch2SlideExplore from "./Overwatch2SlideExplore";
import anime from "animejs/lib/anime.es.js";
import Overwatch2Carousel from "./Overwatch2Carousel";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
import useMeasure from "../useMeasure";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import Overwatch2Accordion from "./Overwatch2Accordion";
import history from "../browserHistory";

const timer = 3000;

interface detailsContent {
    title: string;
    desc: string;
    image: string;
}
const missionContents: detailsContent[] = [
    {
        title: `Action-packed story missions`,
        desc: `Play an active role in the next chapter of the Overwatch saga through a series of intense four-player missions. 
        Fight back against Null Sector, uncover the motives behind the omnic attacks, and confront a rising wave of new threats.`,
        image: `https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/co-op-missions/story-missions/story01-2560.jpg`,
    },
    {
        title: `Replayable Hero Missions`,
        desc: `The battle continues with Hero Missions. As escalating crises break out around the world,
        encounter an ever-changing array of scenarios with a range of diverse and dangerous enemies. Level up your favorite heroes and earn powerful customization options to help beat the odds.`,
        image: `https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/co-op-missions/hero-missions/hero02-2560.jpg`,
    },
    {
        title: `New Factions Arise`,
        desc: `It’s up to you and your friends to stop Null Sector, the elite forces of Talon, and other enemies of Overwatch from carrying out their plans.
        Each enemy faction features a unique mix of units with their own strategies and strengths, challenging you to adapt your approach every time you play.`,
        image: `https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/co-op-missions/enemies/enemy01-2560.jpg`,
    },
];

const teamContents: detailsContent[] = [
    {
        title: `A New Era of Epic Competition`,
        desc: `In Push, a new, symmetrical map type that will launch with Overwatch 2, teams battle to take control of a robot that 
        begins in a central location, then push it toward the enemy base. Either team may take control of the robot at any time. The team that pushes the robot furthest onto the enemy side wins the game.`,
        image: `https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/push/push01-2560.jpg`,
    },
    {
        title: `Ever-Evolving Multiplayer`,
        desc: `Take the battle to new, iconic international locations, from the colorful streets of Rio de Janeiro to the scenic splendor of Gothenburg.`,
        image: `https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/maps/gothenburg/banner.jpg`,
    },
];

interface Overwatch2SlideExploreDetailsProps {
    match: any;
}
const Overwatch2SlideExploreDetails: React.FC<Overwatch2SlideExploreDetailsProps> = (
    props
) => {
    const [selectedContentIndex, setSelectedContentIndex] = useState(0);
    const [dropdownClicked, setDropdownClicked] = useState(false);
    const [contents, setContents] = useState(teamContents);
    useEffect(() => {
        if (props.match.params.section === "team") {
            setContents(teamContents);
        } else {
            setContents(missionContents);
        }
    }, []);

    //Does not work becuase we have multiple binds, so we create the Overwatch2Accordion
    // const showDesc = useTransition(selectedContentIndex, {
    //     from: {
    //         height: 0,
    //         overflow: "hidden",
    //     },
    //     enter: {
    //         height: height,
    //     },

    //     leave: {
    //         height: 0,
    //     },

    //     config: {
    //         duration: timer,
    //     },
    // });

    const rotateArrow = useSpring({
        transform: dropdownClicked ? "rotate(360deg)" : "rotate(270deg)",

        config: {
            duration: 250,
        },
    });
    const showDropdown = useSpring({
        transform: dropdownClicked
            ? "translate3d(0%,0%,0px)"
            : "translate3d(0%,-100%,0px)",
        // opacity: dropdownClicked ? 1 : 0,

        // zIndex: dropdownClicked ? 1 : -1,

        config: {
            duration: 250,
        },
    });

    const titleClicked = useTransition(selectedContentIndex, {
        from: {
            borderLeft: "0px solid #f06414",
        },
        enter: {
            borderLeft: "8px solid #f06414",
        },
        config: {
            duration: 250,
        },
    });

    const slide = useSpring({
        from: {
            transform: "translate3d(-10%,0%,0px)",
            opacity: 0,
        },
        to: {
            transform: "translate3d(0%,0%,0px)",
            opacity: 1,
        },
        config: {
            duration: 750,
        },
    });

    const backgroundTransition = useTransition(selectedContentIndex, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        config: {
            duration: 750,
        },
    });

    const { width } = useWindowDimensions();
    const renderContent = (index: number) => {
        return (
            <React.Fragment key={index}>
                {titleClicked((style, item) => {
                    return (
                        <animated.div
                            className={`overwatch2SlideExploreDetailsTitleWrap`}
                            style={
                                width >= LG_SCREEN_SIZE && item === index
                                    ? style
                                    : {}
                            }
                            onClick={() => setSelectedContentIndex(index)}
                        >
                            <div className="overwatch2SlideExploreDetailsTitleSelected"></div>
                            <h3 className="overwatch2SlideExploreDetailsTitle">
                                {contents[index].title}
                            </h3>
                        </animated.div>
                    );
                })}

                <Overwatch2Accordion
                    toggle={selectedContentIndex === index ? true : false}
                    desc={contents[index].desc}
                />
            </React.Fragment>
        );
    };

    const renderMobileContent = (index: number) => {
        return (
            <React.Fragment>
                <img
                    className="overwatch2SlideExploreDetailsSlideImage"
                    src={contents[index].image}
                    alt=""
                />

                <div className={`overwatch2SlideExploreDetailsTitleWrap`}>
                    <div className="overwatch2SlideExploreDetailsTitleSelected"></div>
                    <h3 className="overwatch2SlideExploreDetailsTitle">
                        {contents[index].title}
                    </h3>
                    <div className="overwatch2SlideExploreDetailsText">
                        {contents[index].desc}
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const renderDropdown = () => {
        return (
            <div className="overwatch2SlideCurrentExploreDetailWrap">
                <p className="overwatch2SlideCurrentExploreDetailDropdownText">
                    {props.match.params.section === "team"
                        ? "Team Vs Team"
                        : "Co-op Mission"}
                    <animated.div
                        style={rotateArrow}
                        onMouseEnter={() => setDropdownClicked(true)}
                        onMouseLeave={() => setDropdownClicked(false)}
                        // onClick={() => setDropdownClicked(!dropdownClicked)}
                    >
                        <RiArrowDownSLine className="overwatch2SlideCurrentExploreDetailArrowDown" />
                    </animated.div>
                </p>

                <animated.div
                    style={showDropdown}
                    className="overwatch2SlideCurrentExploreDetailDropdown"
                    onMouseEnter={() => setDropdownClicked(true)}
                    onMouseLeave={() => setDropdownClicked(false)}
                >
                    <p onClick={() => history.push("/overwatch2-detail/team")}>
                        Team Vs Team
                    </p>
                    <p
                        onClick={() =>
                            history.push("/overwatch2-detail/mission")
                        }
                    >
                        Co-op Mission
                    </p>
                </animated.div>
            </div>
        );
    };
    return (
        <React.Fragment>
            <div className="overwatch2SlideExploreDetailsContainer">
                {width < LG_SCREEN_SIZE && (
                    <React.Fragment>
                        {renderDropdown()}
                        <h1 className="overwatch2SlideExploreDetailsHeader">
                            Power Up And Save The World
                        </h1>
                        {contents.map((content, index) => {
                            return renderMobileContent(index);
                        })}
                    </React.Fragment>
                )}
                <IoIosArrowDropleftCircle
                    className={`overwatch2SideExploreDetailsBackButton`}
                    onClick={() => history.push("/overwatch2")}
                />

                {width >= LG_SCREEN_SIZE && (
                    <React.Fragment>
                        {backgroundTransition((style, item) => {
                            return (
                                <animated.img
                                    style={style}
                                    className="overwatch2SlideExploreDetailsSlideImage"
                                    src={contents[item].image}
                                    alt=""
                                />
                            );
                        })}
                        <animated.div
                            style={slide}
                            className="overwatch2SlideExploreDetailsTextContainer"
                        >
                            {renderDropdown()}
                            <h1 className="overwatch2SlideExploreDetailsHeader">
                                Power Up And Save The World
                            </h1>

                            {contents.map((content, index) => {
                                return renderContent(index);
                            })}
                        </animated.div>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    );
};

export default Overwatch2SlideExploreDetails;
