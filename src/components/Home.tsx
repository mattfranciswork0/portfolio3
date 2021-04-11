import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
//@ts-ignore
const trans1 = (x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`;
const Home: React.FC<{}> = () => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
    }, []);
    const [xHook, setX] = useState(0);
    const [yHook, setY] = useState(0);
    return (
        <React.Fragment>
            <Carousel />
            {/* <div
                className="moonLayer"
                onMouseMove={({ clientX: x, clientY: y }) => {
                    setX(x - window.innerWidth / 2);
                    setY(y - window.innerHeight / 2);
                }}
                style={{
                    transform: trans1(xHook, yHook),
                }}
            ></div>
            <div
                className="star"
                onMouseMove={({ clientX: x, clientY: y }) => {
                    setX(x - window.innerWidth / 2);
                    setY(y - window.innerHeight / 2);
                }}
                style={{
                    transform: trans1(xHook, yHook),
                }}
            ></div> */}
            <div
                className="moonAndStarWrap"
                onMouseMove={({ clientX: x, clientY: y }) => {
                    setX(x - window.innerWidth / 2);
                    setY(y - window.innerHeight / 2);
                }}
                style={{
                    transform: trans1(xHook, yHook),
                }}
            >
                <div className="moonLayer"></div>
                <div className="star"></div>
            </div>
        </React.Fragment>
    );
};

export default Home;
