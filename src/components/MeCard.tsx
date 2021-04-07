import { render } from "react-dom";
import React, { useState } from "react";
import { useSpring, animated as a } from "react-spring";
import me1 from "../img/me1.jpg";
import me2 from "../img/me2.jpg";
const MeCard: React.FC<{}> = () => {
    const [flipped, set] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });
    return (
        <div className="meBackground" onClick={() => set((state) => !state)}>
            <a.img
                className="back"
                src={me1}
                style={{
                    //.to is interpolate; interpolate is depercated in spring v9
                    opacity: opacity.to((o) => 1 - o),
                    transform,
                    // backgroundImage: `url(${me2})`,
                }}
            />
            <a.img
                className="front"
                src={me2}
                style={{
                    opacity,
                    transform: transform.to((t) => `${t} rotateX(180deg)`),
                    // backgroundImage: `url(${me1})`,
                }}
            />
            {!flipped && <div className="glow"></div>}
        </div>
    );
};

export default MeCard;
