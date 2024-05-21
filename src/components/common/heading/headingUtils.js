import React from "react";
import { Span, spanProps } from "../../styled";
import { HeadingCircleContainer, HeadingCircleContent, HeadingCircleDummySquare } from "./headingStyledComponents";
import { headingProps } from "../";

const formatHeading = heading => {
    const headingArr = heading.split(' ');
    const headingFirstWordsArr = headingArr.slice(0, -2);
    const headingFirstWords = headingFirstWordsArr.join(' ');
    const [secondToLastWord, lastWord] = headingArr.slice(-2);
    const formattedHeading = {
        headingFirstWords,
        secondToLastWord,
        lastWord
    };

    return formattedHeading;
};

const buildStyledWord = (headingStyle, variant, secondToLastWord, isDesktop) => {
    const defaultStyle = (
        <Span $rotate={spanProps.rotate.right} $p={[1, 3]} $variant={variant}>{secondToLastWord}</Span>
    );

    switch (headingStyle) {
        case headingProps.headingStyle.circle: {
            const headingCirclePadding = isDesktop ? [3] : [2];

            return (
                <HeadingCircleContainer $variant={variant} $rotate={spanProps.rotate.right} $p={headingCirclePadding}>
                    <HeadingCircleDummySquare $variant={variant} />
                    <HeadingCircleContent $variant={variant} $content={secondToLastWord} />
                </HeadingCircleContainer>
            );
        };
        
        case headingProps.headingStyle.square: {
            return defaultStyle;
        };
        default: {
            return defaultStyle;
        };
    };
};

export {
    formatHeading,
    buildStyledWord
};