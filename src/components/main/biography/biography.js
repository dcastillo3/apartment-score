import React from 'react';
import { Box, Text, cardProps } from '../../styled';
import { useMediaQuery } from '../../../hooks';
import { BiographyContainer } from './biographyStyledComponents';

function Biography() {
    const { isDesktop } = useMediaQuery();
    const biographyContainerPadding = isDesktop ? [5, 8] : [2];
    const biographyTextPadding = [2, 6];

    return (
        <BiographyContainer $variant={cardProps.variant.background} $p={biographyContainerPadding}>
            <Box $p={biographyTextPadding}>
                <Text>Welcome to Apartment Score, the brainchild of Down and Jown, designed to revolutionize your apartment hunting experience!</Text>
            </Box>

            <Box $p={biographyTextPadding}>
                <Text>Tired of endlessly scouring listings and comparing features, only to end up feeling overwhelmed and uncertain about your choices? Look no further! Our innovative app simplifies the apartment selection process by providing you with a comprehensive scoring system that evaluates each listing based on a myriad of factors, ensuring you find your dream apartment with ease.</Text>
            </Box>

            <Box $p={biographyTextPadding}>
                <Text>With our cutting-edge Total Score feature, you can bid farewell to the days of agonizing over which apartment reigns supreme. We crunch the numbers for you, taking into account everything from location and amenities to price and lease terms, delivering a holistic score that reflects the overall quality of each listing.</Text>
            </Box>

            <Box $p={biographyTextPadding}>
                <Text>Say goodbye to guesswork and hello to informed decision-making. Join the countless users who have already found their perfect home through Apartment Score. Try it now and embark on your journey to apartment-hunting bliss!</Text>
            </Box>
        </BiographyContainer>
    );
};

export default Biography;