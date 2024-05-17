import React, { useState } from 'react';
import { Anchor, Box, Button, Card, FlexBox, FlexBoxColumn, SubTitle, TitleSmall, buttonProps, cardProps } from '../styled';
import { updateApartmentForm } from '../main/apartment/apartmentForms';
import { Form } from '../common';
import { buttonNames } from '../main/apartment/apartmentConsts';
import { buildApartmentListItemCategories, fillApartmentForm } from './apartmentListUtils';
import { ApartmentListItemImage, ApartmentListItemImageContainer, ApartmentListTotalScoreContainer } from './apartmentListStyledComponents';
import { useMediaQuery } from '../../hooks';
import { apartmentListItemCategoryPadding } from './apartmentListConsts';
import { formatPriceDisplay } from 'utils/reactUtils';

function ApartmentListItem({apartment, handleDelete, handleUpdate}) {
    const { isDesktop } = useMediaQuery();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const filledApartmentForm = fillApartmentForm(apartment, updateApartmentForm);
    const buttonSize = isDesktop ? buttonProps.size.medium : buttonProps.size.small;
    const formattedPriceDisplay = formatPriceDisplay(apartment.price);

    const updateHandler = apartmentData => {
        handleUpdate(apartment.id, apartmentData);

        toggleUpdateForm();
    };

    const toggleUpdateForm = () => {
        setShowUpdateForm(!showUpdateForm);
    };

    const renderUpdateForm = showUpdateForm && (
        <Box>
            <Form
                formParams={filledApartmentForm}
                handleSubmit={updateHandler}
                handleCancel={toggleUpdateForm}
            />
        </Box>
    );

    const renderApartmentListItemCategories = buildApartmentListItemCategories(apartment);

    const renderApartmentListItem = !showUpdateForm && (
        <Box>
            <Anchor href={apartment.link} target="_blank">
                <ApartmentListItemImageContainer>
                    <ApartmentListItemImage src={apartment.imageLink} alt={apartment.name} />
                </ApartmentListItemImageContainer>
            </Anchor>
            
            <FlexBoxColumn>
                <Card $variant={cardProps.variant.secondary} $p={apartmentListItemCategoryPadding}>
                    <TitleSmall>{apartment.address}</TitleSmall>
                </Card>
                
                <Box $p={apartmentListItemCategoryPadding}>
                    <SubTitle>{formattedPriceDisplay}</SubTitle>
                </Box>

                {renderApartmentListItemCategories}
                
                <ApartmentListTotalScoreContainer>
                    <Box $p={[0, 3]}>
                        <TitleSmall>{apartment.totalScore}</TitleSmall>
                    </Box>
                </ApartmentListTotalScoreContainer>
            </FlexBoxColumn>

            <FlexBox $itemsPerRow={2}>
                <Button $size={buttonSize} $m={[2]} onClick={toggleUpdateForm}>{buttonNames.update}</Button>

                <Button $size={buttonSize} $m={[2]} onClick={() => handleDelete(apartment.id)}>{buttonNames.delete}</Button>
            </FlexBox>
        </Box>
    );

    return (
        <Card $variant={cardProps.variant.backgroundLight} $m={[2, 2]} $p={[2, 2]}>
            {renderUpdateForm}
            {renderApartmentListItem}
        </Card>
    );
};

export default ApartmentListItem;