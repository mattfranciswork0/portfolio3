import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";
import _ from "lodash";
import {
    LG_SCREEN_SIZE,
    XL_SCREEN_SIZE,
    MED_SCREEN_SIZE,
    SM_SCREEN_SIZE,
} from "../constants";
import useWindowDimensions from "../windowDimensions";

const timer = 3000;
//const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
//@ts-ignore
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
//@ts-ignore
const podTrans1 = (x, y, z) => `translate3d(${x}px,${y}px,${z}px)`;

const Overwatch2SlideLanding: React.FC<{}> = () => {
    const [xHook, setX] = useState(0);
    const [yHook, setY] = useState(0);
    const { width } = useWindowDimensions();
    return (
        <React.Fragment>
            <div className="overwatch2SlideParentContainer overwatch2SlideLandingParentContainer">
                <animated.div
                    className="overwatch2SlideContainer"
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
                    '
                    <img
                        className="overwatch2Sky"
                        src="https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/parallax/landing/landing-bg-sky-LG.webp"
                        alt=""
                        onError={(e: any) => {
                            e.target.onError = null;
                            e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617597198/blizzard/overwatch2/landing-bg-sky-LG.webp`;
                        }}
                    />
                    <img
                        className="overwatch2LandingCity"
                        src="
        https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/parallax/landing/landing-bg-ground-LG.webp"
                        alt=""
                        onError={(e: any) => {
                            e.target.onError = null;
                            e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617148042/blizzard/overwatch2/landing-bg-ground-LG.webp`;
                        }}
                    />
                    <img
                        className="overwatch2LandingRein"
                        src="https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/parallax/landing/landing-hero-rein-LG.webp"
                        alt=""
                        onError={(e: any) => {
                            e.target.onError = null;
                            e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617146456/blizzard/overwatch2/landing-hero-rein-LG.webp`;
                        }}
                    />
                    <img
                        className="overwatch2LandingTracer"
                        src="
                        https://overwatch2-static.playoverwatch.com/9bff17453c4b61344f201071908821fc391221ca/static/images/parallax/landing/landing-hero-tracer-XL.webp"
                        alt=""
                        onError={(e: any) => {
                            e.target.onError = null;
                            e.target.src = `https://res.cloudinary.com/du8n2aa4p/image/upload/v1617146474/blizzard/overwatch2/landing-hero-tracer-XL.webp`;
                        }}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 30.93"
                        className="OW2LogoSvg"
                    >
                        <title>Overwatch 2 Logo</title>
                        <polygon points="27.97 26.77 27.08 28.89 27.08 28.89 26.15 26.77 25.18 26.77 24.26 28.86 23.38 26.77 21.9 26.77 23.73 30.93 24.66 30.93 25.6 28.84 26.52 30.93 27.51 30.93 29.33 26.77 27.97 26.77"></polygon>
                        <polygon points="48.59 26.77 48.59 28.23 46.04 28.23 46.04 26.77 44.62 26.77 44.62 30.93 46.04 30.93 46.04 29.32 48.59 29.32 48.59 30.93 50 30.93 50 26.77 48.59 26.77"></polygon>
                        <polygon points="31.02 26.77 28.23 30.93 29.77 30.93 31.5 28.25 33.22 30.93 34.81 30.93 32.09 26.77 31.02 26.77"></polygon>
                        <polygon points="11.69 26.77 10.12 26.77 8.54 29.3 6.98 26.77 5.37 26.77 8 30.93 8.96 30.93 11.69 26.77"></polygon>
                        <polygon points="33.71 26.77 33.71 27.86 35.52 27.86 35.52 30.93 36.94 30.93 36.94 27.86 38.36 27.86 39.09 26.77 33.71 26.77"></polygon>
                        <path d="M4.8,26.84a1.87,1.87,0,0,0-.49-.07H1.17c-.72,0-1.17.36-1.17.95V30a.85.85,0,0,0,.49.78l.06,0,.86-.87V27.86H4.06v2H2.11L1,30.93H4.31c.69,0,1.17-.39,1.17-.94V27.83l-.65-1Z"></path>
                        <path d="M42.86,26.77H40l-.23,0h0l-.12.19h0l-.78,1.18V30c0,.55.48.94,1.17.94h2.84A1.06,1.06,0,0,0,44,30v-.72H42.61v.56H40.27v-2h2.34v.49H44v-.63C44,27.15,43.57,26.77,42.86,26.77Z"></path>
                        <polygon points="11.61 27.81 11.61 30.93 16.01 30.93 16.01 29.83 13.03 29.83 13.03 29.31 15.04 29.31 15.04 28.36 13.03 28.36 13.03 27.86 16.01 27.86 16.01 26.77 12.33 26.77 11.61 27.81"></polygon>
                        <path d="M20.59,29.37c.51,0,1.06-.27,1.06-.76v-1c0-.53-.4-.86-1.06-.86H16.64v4.16h1.41V27.84h2.23v.69H18.69v.84l1.75,1.56h1.94Z"></path>
                        <path d="M23.31,3.29a8.17,8.17,0,0,1,5.4,2L31,3A11.52,11.52,0,0,0,15.58,3l2.33,2.33A8.19,8.19,0,0,1,23.31,3.29Z"></path>
                        <path d="M31.74,3.67,29.41,6a8.23,8.23,0,0,1,1.08,9.52l-4.61-4.44-2.08-5V13.6L28.37,18a8.25,8.25,0,0,1-10.11,0l4.57-4.4V6.06l-2.08,5-4.62,4.44A8.23,8.23,0,0,1,17.21,6L14.89,3.67a11.51,11.51,0,1,0,16.85,0Z"></path>
                        <path d="M42.55,6.49h-6a14.27,14.27,0,0,0-3-4.7L32.54,2.86a12.62,12.62,0,0,1,0,17.3l1.08,1.07a14.17,14.17,0,0,0,3-4.7h6a1,1,0,0,0,1-1V7.46A1,1,0,0,0,42.55,6.49Zm-4.9,2.36a1.23,1.23,0,0,1,.7-.6.85.85,0,0,1,.23,0H41a.89.89,0,0,1,.57.22L40.34,9.59H38.79v.76H37.42V9.74A1.73,1.73,0,0,1,37.65,8.85Zm4.61,4.89a1,1,0,0,1-.44.92.7.7,0,0,1-.44.14H37.26c0-.27,0-.57,0-.85a1.17,1.17,0,0,1,.28-.79,4.54,4.54,0,0,1,.38-.38L42,9a1.33,1.33,0,0,1,.12.52c0,.18,0,.36,0,.54a1.34,1.34,0,0,1-.28.74,2.67,2.67,0,0,1-.4.42L39,13.43h3.26Z"></path>
                        <path d="M31.81,21.1h-.08v.12h0V20.9h.13a.09.09,0,0,1,.1.1.1.1,0,0,1-.07.1l.07.12h-.05Zm-.08,0h.08s.07,0,.07-.06a.07.07,0,0,0-.07-.07h-.08Z"></path>
                        <path d="M31.8,21.36a.3.3,0,1,1,.3-.3A.3.3,0,0,1,31.8,21.36Zm0-.56a.26.26,0,0,0-.27.26.27.27,0,0,0,.53,0A.26.26,0,0,0,31.8,20.8Z"></path>
                    </svg>
                </animated.div>
            </div>
        </React.Fragment>
    );
};

export default Overwatch2SlideLanding;
