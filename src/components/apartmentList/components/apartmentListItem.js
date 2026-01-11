import React, { useState, useContext } from 'react';
import { Anchor, Box, Card, FlexBoxColumn, cardProps } from '../../styled';
import { updateApartmentForm } from '../../main/apartment/apartmentForms';
import { BarChart, Form, Overlay, overlayProps } from '../../common';
import { fillApartmentListItemForm, formatApartmentListItemChartData } from '../apartmentListUtils';
import { ApartmentListItemContainer, ApartmentListItemImage } from '../apartmentListStyledComponents';
import { useMediaQuery } from '../../../hooks';
import { SettingsContext } from 'context';
import { apartmentListItemCategoryPadding } from '../apartmentListConsts';
import ApartmentListItemMapsLink from './apartmentListItemMapsLink';
import ApartmentListItemDetails from './apartmentListItemDetails';
import ApartmentListItemScoreBadge from './apartmentListItemScoreBadge';
import ApartmentListItemCTARow from './apartmentListItemCTArow';
import { barChartProps } from 'components/common/barChart/barChartConsts';

function ApartmentListItem({
    apartment,
    highlighted,
    handleDelete,
    handleUpdate,
    apartmentRef
}) {
    const { isDesktop } = useMediaQuery();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const { noteSettings } = useContext(SettingsContext);
    const filledApartmentForm = fillApartmentListItemForm(noteSettings, apartment, updateApartmentForm);
    const { listItemChartData, listItemChartRange } = formatApartmentListItemChartData(apartment);

    const handleUpdateClick = apartmentData => {
        handleUpdate(apartment.id, apartmentData);

        toggleUpdateForm();
    };

    const handleDeleteClick = () => {
        handleDelete(apartment.id);
    };

    const toggleUpdateForm = () => {
        setShowUpdateForm(!showUpdateForm);
    };

    const renderUpdateForm = showUpdateForm && (
        <Box>
            <Form
                formParams={filledApartmentForm}
                handleSubmit={handleUpdateClick}
                handleCancel={toggleUpdateForm}
            />
        </Box>
    );

    // TO-DO: Make accordion component. Use to render BarChart & CTA row.
    // TO-DO: Make 1st, 2nd and 3rd place badges.
    const renderApartmentListItem = !showUpdateForm && (
        <Box>
            <Anchor href={apartment.link} target="_blank">
                <Overlay 
                    overlayComponent={() => <ApartmentListItemScoreBadge totalScore={apartment.totalScore} />}
                    overlayPositionX={overlayProps.overlayPositionX.left}
                    overlayPositionY={overlayProps.overlayPositionY.top}
                >
                    <ApartmentListItemImage src={apartment.imageLink} alt={apartment.name} />
                </Overlay>
            </Anchor>
            
            <FlexBoxColumn>
                <Card $variant={cardProps.variant.secondary} $p={apartmentListItemCategoryPadding}>
                    <ApartmentListItemMapsLink address={apartment.address} />
                </Card>

                <ApartmentListItemDetails
                    bedrooms={apartment.bedrooms}
                    bathrooms={apartment.bathrooms}
                    price={apartment.price}
                    expenses={apartment.expenses}
                />

                <BarChart
                    type={barChartProps.type.bar}
                    barDirection={barChartProps.barDirection.horizontal}
                    data={listItemChartData}
                    range={listItemChartRange}
                />
            </FlexBoxColumn>

            <ApartmentListItemCTARow isDesktop={isDesktop} handleToggleUpdateClick={toggleUpdateForm} handleDeleteClick={handleDeleteClick} />
        </Box>
    );

    return (
        <ApartmentListItemContainer 
            ref={apartmentRef} 
            $variant={cardProps.variant.backgroundLight} 
            $m={[2, 2]} 
            $p={[2, 2]}
            $highlighted={highlighted}
        >
            {renderUpdateForm}
            {renderApartmentListItem}
        </ApartmentListItemContainer>
    );
};

export default ApartmentListItem;