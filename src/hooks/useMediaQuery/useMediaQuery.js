import { useEffect, useState } from "react";
import { intialWindowWidth, useMediaQueryEvent } from "./useMediaQueryConsts";
import { getIsDesktop, getIsMobile, getIsTablet, getInitialIsMobile, getInitialIsTablet, getInitialIsDesktop } from "./useMediaQueryUtils";

const useMediaQuery = () => {
    const [windowWidth, setWindowWidth] = useState(intialWindowWidth);
    const [isMobile, setIsMobile] = useState(getInitialIsMobile);
    const [isTablet, setIsTablet] = useState(getInitialIsTablet);
    const [isDesktop, setIsDesktop] = useState(getInitialIsDesktop);

    useEffect(() => {
        const handleResizeWindow = () => {
            const currWindowWidth = window.innerWidth;

            setIsMobile(getIsMobile(currWindowWidth));

            setIsTablet(getIsTablet(currWindowWidth));

            setIsDesktop(getIsDesktop(currWindowWidth));

            setWindowWidth(currWindowWidth);
        };

        window.addEventListener(useMediaQueryEvent, handleResizeWindow);

        return () => window.removeEventListener(useMediaQueryEvent, handleResizeWindow);
    }, [windowWidth]);

    return {
        windowWidth,
        isMobile,
        isTablet,
        isDesktop
    };
};

export default useMediaQuery;