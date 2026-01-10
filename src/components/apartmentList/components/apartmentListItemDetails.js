import React from 'react';
import { Box, FlexBox, FlexBoxColumn, SubTitle, TextSmall } from '../../styled';
import { ApartmentListItemFlexBoxContainer, ApartmentListItemFlexBoxRightContainer } from '../apartmentListStyledComponents';
import { apartmentListItemCategoryPadding, bathroomAbbreviation, bedroomAbbreviation } from '../apartmentListConsts';
import {  formatPriceDisplay } from 'utils/reactUtils';

function ApartmentListItemDetails({bedrooms, bathrooms, price, expenses}) {
    const formattedPriceDisplay = formatPriceDisplay(price);
    const formattedExpensesDisplay = formatPriceDisplay(price + expenses);

    return (
        <FlexBoxColumn>
            <ApartmentListItemFlexBoxContainer>
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
            </ApartmentListItemFlexBoxContainer>

            <ApartmentListItemFlexBoxRightContainer $p={[0, 2]}>
                <TextSmall>with expenses: {formattedExpensesDisplay}</TextSmall>
            </ApartmentListItemFlexBoxRightContainer>
        </FlexBoxColumn>
    );
};

export default ApartmentListItemDetails;