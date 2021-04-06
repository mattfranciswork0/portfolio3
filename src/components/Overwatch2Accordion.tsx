import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpring, to } from "react-spring";

import useMeasure from "../useMeasure";
const timer = 1000;

interface Overwatch2AccordianProps {
    toggle: boolean;
    desc: string;
}
const Overwatch2: React.FC<Overwatch2AccordianProps> = (props) => {
    //@ts-ignore
    const [bind, { height }] = useMeasure();
    const showDescSpring = useSpring({
        from: {
            overflow: "hidden",
            height: 0,
        },
        to: {
            height: props.toggle ? height : 0,
        },
        config: {
            duration: timer,
        },
    });
    return (
        <React.Fragment>
            <animated.div style={showDescSpring}>
                <div {...bind} className="overwatch2SlideExploreDetailsText">
                    {props.desc}
                </div>
            </animated.div>
        </React.Fragment>
    );
};

export default Overwatch2;
