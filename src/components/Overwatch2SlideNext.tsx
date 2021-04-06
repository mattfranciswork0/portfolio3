import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import _ from "lodash";
import useWindowDimensions from "../windowDimensions";
import Overwatch2SlideExplore from "./Overwatch2SlideExplore";
import anime from "animejs/lib/anime.es.js";
import Overwatch2Carousel from "./Overwatch2Carousel";
import {
    LG_SCREEN_SIZE,
    XL_SCREEN_SIZE,
    MED_SCREEN_SIZE,
    SM_SCREEN_SIZE,
} from "../constants";

const timer = 3000;
//const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
//@ts-ignore
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
//@ts-ignore
const podTrans1 = (x, y, z) => `translate3d(${x}px,${y}px,${z}px)`;

const Overwatch2: React.FC<{}> = () => {
    const [xHook, setX] = useState(0);
    const [yHook, setY] = useState(0);
    const { width } = useWindowDimensions();
    return (
        <React.Fragment>
            <div className="overwatch2SlideParentContainer overwatch2SlideNextParentContainer">
                <animated.div
                    className="overwatch2SlideContainer overwatch2NextSlideContainer"
                    onMouseMove={({ clientX: x, clientY: y }) => {
                        setX(x - window.innerWidth / 2);
                        setY(y - window.innerHeight / 2);
                        //Code below does not work, so I used hooks above
                        // xy.to((xy) => [x, y])
                    }}
                    style={{
                        transform:
                            width >= MED_SCREEN_SIZE
                                ? trans1(xHook, yHook)
                                : "translate3d(0px,0px,0px)",
                    }}
                >
                    <img
                        className="overwatch2NextSky"
                        src="https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/whats-next/whats-next-bg-lg.webp"
                        alt=""
                        onError={(e: any) => {
                            e.target.onError = null;
                            e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617285517/blizzard/overwatch2/slide%204%20-%20what%27s%20next/whats-next-bg-lg.webp`;
                        }}
                    />

                    <img
                        className="overwatch2NextRein"
                        src="https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/whats-next/lg/whats-next-hero-rein-lg.webp"
                        alt=""
                        onError={(e: any) => {
                            e.target.onError = null;
                            e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617285382/blizzard/overwatch2/slide%204%20-%20what%27s%20next/whats-next-hero-rein-lg.webp`;
                        }}
                    />
                    <img
                        className="overwatch2NextTracer"
                        src="
                    https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/whats-next/lg/whats-next-hero-tracer-lg.webp"
                        alt=""
                        onError={(e: any) => {
                            e.target.onError = null;
                            e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617285628/blizzard/overwatch2/slide%204%20-%20what%27s%20next/whats-next-hero-tracer-lg.webp`;
                        }}
                    />
                    <img
                        className="overwatch2NextMei"
                        src="
                    https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/whats-next/lg/whats-next-hero-mei-lg.webp"
                        alt=""
                        onError={(e: any) => {
                            e.target.onError = null;
                            e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617288997/blizzard/overwatch2/slide%204%20-%20what%27s%20next/whats-next-hero-mei-lg.webp`;
                        }}
                    />
                    <h1 className="overwatch2NextTitle">
                        Your Mission Continues, keep an eye out for our release
                        date
                    </h1>
                </animated.div>
            </div>
        </React.Fragment>
    );
};

export default Overwatch2;
