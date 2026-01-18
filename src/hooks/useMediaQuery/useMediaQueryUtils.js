import { minDesktopWidth, minTabletWidth, intialWindowWidth } from "./useMediaQueryConsts";

const getIsDesktop = currWindowWidth => currWindowWidth > minDesktopWidth

const getIsTablet = currWindowWidth => !getIsDesktop(currWindowWidth) && currWindowWidth > minTabletWidth;

const getIsMobile = currWindowWidth => currWindowWidth < minTabletWidth;

const getInitialIsMobile = () => {
    const initialIsMobile = getIsMobile(intialWindowWidth);
    
    return initialIsMobile;
};

const getInitialIsTablet = () => {
    const initialIsTablet = getIsTablet(intialWindowWidth);
    
    return initialIsTablet;
};

const getInitialIsDesktop = () => {
    const initialIsDesktop = getIsDesktop(intialWindowWidth);
    
    return initialIsDesktop;
};

export {
    getIsDesktop,
    getIsTablet,
    getIsMobile,
    getInitialIsMobile,
    getInitialIsTablet,
    getInitialIsDesktop
};