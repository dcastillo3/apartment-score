import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, FlexBox, Option, Select, buttonProps, cardProps } from '../../styled';
import { useMediaQuery } from '../../../hooks';
import { ApartmentButtonHeaderContainer, ApartmentContainer } from './apartmentStyledComponents';
import { categories, initialStates, orders } from '../../../utils/consts';
import { ApartmentList } from '../../apartmentList';
import { addApartmentForm } from './apartmentForms';
import { Form, Heading, Modal, headingProps, modalProps } from '../../common';
import { apartmentListHeading, buttonNames } from './apartmentConsts';
import { ApartmentContext, SettingsContext } from 'context';
import { buildCategoryLabel } from 'utils/reactUtils';

function Apartment() {
    const { 
        apartments, 
        handleAddApartment, 
        handleDeleteApartment, 
        handleUpdateApartment,
        handleSortApartments 
    } = useContext(ApartmentContext);
    const [sortCategory, setSortCategory] = useState(initialStates.sortCategory);
    const [order, setOrder] = useState(initialStates.order);
    const [showModal, setShowModal] = useState(false);
    const { settings } = useContext(SettingsContext);
    
    const { isDesktop } = useMediaQuery();
    const apartmentContainerPadding = isDesktop ? [5, 8] : [2];
    const apartmentButtonHeaderContainerPadding = isDesktop ? [5, 0] : [2];
    const headingMargin = isDesktop ? [0, 8] : [0, 5];
    const addButtonSize = isDesktop ? buttonProps.size.medium : buttonProps.size.small;

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const addApartment = apartment => {
        handleAddApartment(apartment, settings);

        toggleModal();
    };

    const updateApartment = (id, apartment) => {
        handleUpdateApartment(id, apartment, settings);
    };

    const handleChangeOrder = e => {
        const { value: newOrder } = e.target;

        setOrder(newOrder);

        handleSortApartments(sortCategory, newOrder);
    };

    const handleChangeSortCategory = e => {
        const { value: newSortCategory } = e.target;

        setSortCategory(newSortCategory);

        handleSortApartments(newSortCategory, order);
    };

    //Sort apartments after changes to apartments
    useEffect(() => {
        handleSortApartments(sortCategory, order);
    }, [apartments]);

    const renderApartmentList = apartments.length > 0 && (
        <ApartmentList 
            apartments={apartments} 
            handleDeleteApartment={handleDeleteApartment}
            handleUpdateApartment={updateApartment}
        />
    );

    const renderApartmentHeader = apartments.length > 0 && (
        <Box $m={headingMargin}>
            <Heading
                variant={headingProps.variant.success}
                heading={apartmentListHeading}
            />
        </Box>
    );

    const renderApartmentSortMenuNonScoreCategories = categories.sortableNonScoreCategories.map(category => {
        const categoryLabel = buildCategoryLabel(category);

        return (
            <Option key={category} value={category}>{categoryLabel}</Option>
        );
    });

    const renderApartmentSortMenuScoreCategories = categories.scoreCategories.map(category => {
        const categoryLabel = buildCategoryLabel(category);

        return (
            <Option key={category} value={category}>{categoryLabel}</Option>
        );
    });

    const renderApartmentSortMenuOrderOptions = Object.values(orders).map(order => (
        <Option key={order} value={order}>{order}</Option>
    ));

    const renderApartmentSortMenu = apartments.length > 0 && (
        <FlexBox $center>
            <Box $m={[0, 1, 0, 0]}>
                <Select onChange={handleChangeSortCategory} value={sortCategory}>
                    {renderApartmentSortMenuNonScoreCategories}
                    {renderApartmentSortMenuScoreCategories}
                </Select>
            </Box>

            <Box $m={[0, 0, 0, 1]}>
                <Select onChange={handleChangeOrder} value={order}>
                    {renderApartmentSortMenuOrderOptions}
                </Select>
            </Box>
        </FlexBox>
    );

    return (
        <ApartmentContainer $variant={cardProps.variant.background} $p={apartmentContainerPadding}>
            <Box>
                {renderApartmentHeader}

                <ApartmentButtonHeaderContainer $hasApartments={apartments.length > 0} $p={apartmentButtonHeaderContainerPadding}>
                    {renderApartmentSortMenu}

                    <Modal
                        showModal={showModal}
                        variant={modalProps.variant.backgroundLight}
                        handleToggleModal={toggleModal}
                        center
                    >
                        <Form
                            formParams={addApartmentForm}
                            handleSubmit={addApartment}
                        />
                    </Modal>

                    <Button $size={addButtonSize} onClick={toggleModal}>
                        {buttonNames.add}
                    </Button>
                </ApartmentButtonHeaderContainer>
            </Box>

            {renderApartmentList}
        </ApartmentContainer>
    );
};

export default Apartment;