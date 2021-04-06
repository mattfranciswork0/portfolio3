import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";

import {
    LG_SCREEN_SIZE,
    XL_SCREEN_SIZE,
    MED_SCREEN_SIZE,
    SM_SCREEN_SIZE,
} from "../constants";
import useWindowDimensions from "../windowDimensions";
import me1 from "../img/me1.jpg";
import me2 from "../img/me2.jpg";
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
                    <img className="meBackground" src={me1} alt="" />
                    <div className="landingNameAndRoleWrap">
                        <h1 className="landingName">Matthew Francis</h1>
                        <p className="landingRole">
                            3rd Year Student - BSc Computer Science at Wilfrid
                            Laurier University.
                        </p>
                    </div>
                </animated.div>
            </div>
        </React.Fragment>
    );
};

export default Overwatch2SlideLanding;
