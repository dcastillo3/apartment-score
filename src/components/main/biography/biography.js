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
                <Text>Welcome to Apartment Score, designed to revolutionize your apartment hunting experience!</Text>
            </Box>

            <Box $p={biographyTextPadding}>
                <Text>Tired of endlessly scouring listings and feeling overwhelmed by your options? Our innovative app simplifies your search with a comprehensive scoring system that evaluates each listing on various factors, helping you find your dream apartment effortlessly.</Text>
            </Box>

            <Box $p={biographyTextPadding}>
                <Text>Our Total Score feature analyzes location, amenities, price, and lease features, providing a holistic score that highlights the best apartments for you.</Text>
            </Box>

            <Box $p={biographyTextPadding}>
                <Text>Say goodbye to guesswork and make informed decisions with ease. Join the users who have found their perfect home through Apartment Score. Try it now and start your journey to apartment-hunting bliss!</Text>
            </Box>
        </BiographyContainer>
    );
};

export default Biography;