import React, { useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

import { useState, useEffect } from "react";

const useMeasure = () => {
    const ref = useRef<any>();
    const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const [ro] = useState(
        //@ts-ignore
        () => new ResizeObserver(([entry]) => set(entry.contentRect))
    );

    useEffect(() => {
        if (!ref.current) return;
        //@ts-ignore
        ro.observe(ref.current);
        //Using scott/level up turtorial's solution would crash, so use disconnect :)!
        return () => ro.disconnect();
    }, []);
    return [{ ref }, bounds];
};
export default useMeasure;
