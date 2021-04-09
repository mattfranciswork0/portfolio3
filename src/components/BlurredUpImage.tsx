import React from "react";
import useProgressiveImg from "../useProgressiveImg";
interface BlurredUpImageProps {
    lowRes: string;
    highRes: string;
}
const BlurredUpImage: React.FC<BlurredUpImageProps> = (props) => {
    //@ts-ignore
    const [src, { blur }] = useProgressiveImg(props.lowRes, props.highRes);
    return (
        <img
            alt=""
            //@ts-ignore
            src={src}
            style={{
                filter: blur ? "blur(20px)" : "none",
                transition: blur ? "none" : "filter 0.3s ease-out",
            }}
        />
    );
};
export default BlurredUpImage;
