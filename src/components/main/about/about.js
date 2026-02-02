import React from 'react';
import { Box, Text, cardProps } from '../../styled';
import { useMediaQuery } from '../../../hooks';
import { AboutContainer } from './aboutStyledComponents';

function About() {
    const { isDesktop } = useMediaQuery();
    const aboutContainerPadding = isDesktop ? [5, 8] : [2];
    const aboutTextPadding = [2, 6];

    return (
        <AboutContainer $variant={cardProps.variant.background} $p={aboutContainerPadding}>
            <Box $p={aboutTextPadding}>
                <Text>Welcome to Apartment Score, designed to revolutionize your apartment hunting experience!</Text>
            </Box>

            <Box $p={aboutTextPadding}>
                <Text>Tired of endlessly scouring listings and feeling overwhelmed by your options? Our innovative app simplifies your search with a comprehensive scoring system that evaluates each listing on various factors, helping you find your dream apartment effortlessly.</Text>
            </Box>

            <Box $p={aboutTextPadding}>
                <Text>Our Total Score feature analyzes location, amenities, price, and lease features, providing a holistic score that highlights the best apartments for you.</Text>
            </Box>

            <Box $p={aboutTextPadding}>
                <Text>Say goodbye to guesswork and make informed decisions with ease. Join the users who have found their perfect home through Apartment Score. Try it now and start your journey to apartment-hunting bliss!</Text>
            </Box>
        </AboutContainer>
    );
};

export default About;