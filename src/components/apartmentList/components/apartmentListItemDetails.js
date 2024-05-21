import React from 'react';
import { Box, FlexBox, SubTitle } from '../../styled';
import { ApartmentListItemDetailsContainer } from '../apartmentListStyledComponents';
import { apartmentListItemCategoryPadding, bathroomAbbreviation, bedroomAbbreviation } from '../apartmentListConsts';
import {  formatPriceDisplay } from 'utils/reactUtils';

function ApartmentListItemDetails({bedrooms, bathrooms, price}) {
    const formattedPriceDisplay = formatPriceDisplay(price);

    return (
        <ApartmentListItemDetailsContainer>
            <FlexBox $p={apartmentListItemCategoryPadding}>
                <Box $p={[0, 1, 0, 0]}>
                    <SubTitle>{bedrooms}{bedroomAbbreviation}</SubTitle>
                </Box>

                <Box $p={[0, 0, 0, 1]}>
                    <SubTitle>{bathrooms}{bathroomAbbreviation}</SubTitle>
                </Box>
            </FlexBox>

            <Box $p={apartmentListItemCategoryPadding}>
                <SubTitle>{formattedPriceDisplay}</SubTitle>
            </Box>
        </ApartmentListItemDetailsContainer>
    );
};

export default ApartmentListItemDetails;