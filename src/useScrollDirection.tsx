import React from "react";

import { useState, useEffect } from "react";
const SCROLL_UP = "up";
const SCROLL_DOWN = "down";

const useScrollDirection = () => {
    const [scrollDir, setScrollDir] = useState("scrolling down");

    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDir(
                scrollY > lastScrollY ? "scrolling down" : "scrolling up"
            );
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);

        console.log(scrollDir);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollDir]);
    return scrollDir;
};
export default useScrollDirection;
