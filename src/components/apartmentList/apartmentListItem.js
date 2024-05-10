import React, { useState } from 'react';
import { Box, Button, Card, FlexBox, FlexBoxColumn, Label, TextSmall, TitleSmall, cardProps } from '../styled';
import { updateApartmentForm } from '../main/apartment/apartmentForms';
import { Form } from '../common';
import { buttonNames } from '../main/apartment/apartmentConsts';
import { fillApartmentForm } from './apartmentListUtils';
import { ApartmentListTotalScoreContainer } from './apartmentListStyledComponents';

function ApartmentListItem({apartment, handleDelete, handleUpdate}) {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const filledApartmentForm = fillApartmentForm(apartment, updateApartmentForm);
    const apartmentListItemFieldPadding = [3, 3];

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

    const renderApartmentListItem = !showUpdateForm && (
        <Box>
            <FlexBoxColumn>
                <FlexBox $itemsPerRow={2}>
                    <FlexBoxColumn $p={apartmentListItemFieldPadding}>
                        <Label>Name: </Label>
                        <TextSmall>{apartment.name}</TextSmall>
                    </FlexBoxColumn>

                    <FlexBoxColumn $p={apartmentListItemFieldPadding}>
                        <Label>Price: </Label>
                        <TextSmall>{apartment.price}</TextSmall>
                    </FlexBoxColumn>
                </FlexBox>

                <FlexBox $itemsPerRow={2}>
                    <FlexBoxColumn $p={apartmentListItemFieldPadding}>
                        <Label>Bedrooms: </Label>
                        <TextSmall>{apartment.bedrooms}</TextSmall>
                    </FlexBoxColumn>

                    <FlexBoxColumn $p={apartmentListItemFieldPadding}>
                        <Label>Bathrooms: </Label>
                        <TextSmall>{apartment.bathrooms}</TextSmall>
                    </FlexBoxColumn>
                </FlexBox>

                <FlexBox $itemsPerRow={2}>
                    <FlexBoxColumn $p={apartmentListItemFieldPadding}>
                        <Label>Walk Score: </Label>
                        <TextSmall>{apartment.walkScore}</TextSmall>
                    </FlexBoxColumn>
                    
                    <FlexBoxColumn $p={apartmentListItemFieldPadding}>
                        <Label>Location Score: </Label>
                        <TextSmall>{apartment.locationScore}</TextSmall>
                    </FlexBoxColumn>
                </FlexBox>

                <FlexBox $itemsPerRow={2}>
                    <FlexBoxColumn $p={apartmentListItemFieldPadding}>
                        <Label>Amenity Score: </Label>
                        <TextSmall>{apartment.amenityScore}</TextSmall>
                    </FlexBoxColumn>

                    <FlexBoxColumn $p={apartmentListItemFieldPadding}>
                        <Label>Interior Score: </Label>
                        <TextSmall>{apartment.interiorScore}</TextSmall>
                    </FlexBoxColumn>
                </FlexBox>
                
                <ApartmentListTotalScoreContainer>
                    <Box $p={[0, 3]}>
                        <TitleSmall>{apartment.totalScore}</TitleSmall>
                    </Box>
                </ApartmentListTotalScoreContainer>
            </FlexBoxColumn>

            <FlexBox $itemsPerRow={2}>
                <Button $m={[2]} onClick={toggleUpdateForm}>{buttonNames.update}</Button>

                <Button $m={[2]} onClick={() => handleDelete(apartment.id)}>{buttonNames.delete}</Button>
            </FlexBox>
        </Box>
    );

    return (
        <Card $variant={cardProps.variant.backgroundLight} $m={[2, 2]} $p={[2, 2]}>
            <FlexBoxColumn>
                {renderUpdateForm}
                {renderApartmentListItem}
            </FlexBoxColumn>
        </Card>
    );
};

export default ApartmentListItem;