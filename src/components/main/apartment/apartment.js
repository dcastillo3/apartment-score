import React, { useEffect, useState } from 'react';
import { Box, FlexBox, Option, Select, cardProps } from '../../styled';
import { useMediaQuery } from '../../../hooks';
import { ApartmentButtonHeaderContainer, ApartmentContainer, ApartmentModalContainer } from './apartmentStyledComponents';
import { initialStates, localStorageKeys } from '../../../utils/consts';
import { generateUniqueId } from '../../../utils/reactUtils';
import { ApartmentList } from '../../apartmentList';
import { addApartmentForm } from './apartmentForms';
import { Form, Modal, modalProps } from '../../common';
import { buttonNames } from './apartmentConsts';
import { getTotalScore } from '../../apartmentList/apartmentListUtils';
import { getStateFromLocalStorage, setLocalStorageState } from '../../../utils/helpers';

function Apartment() {
    const [apartments, setApartments] = useState(() => getStateFromLocalStorage(localStorageKeys.apartments));
    const [sortProperty, setSortProperty] = useState(initialStates.sortProperty);
    const [order, setOrder] = useState(initialStates.order);
    const [showModal, setShowModal] = useState(false);
    
    const { isDesktop } = useMediaQuery();
    const portfolioContainerPadding = isDesktop ? [5, 8] : [2];

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleAddApartment = apartmentData => {
        const newTotalScore = getTotalScore(apartmentData);
        const newApartment = {
            id: generateUniqueId(),
            ...apartmentData,
            totalScore: newTotalScore
        };
        const newApartments = [newApartment, ...apartments];

        // Persist apartments in local storage
        setLocalStorageState(localStorageKeys.apartments, newApartments);

        setApartments(newApartments);

        toggleModal();
    };

    const handleUpdateApartment = (id, apartmentData) => {
        const newApartments = apartments.map(apartment => {
            if (apartment.id === id) {
                const newTotalScore = getTotalScore(apartmentData);
                const newApartment = {
                    ...apartment,
                    ...apartmentData,
                    totalScore: newTotalScore
                };

                return newApartment;
            };

            return apartment;
        });

        // Persist apartments in local storage
        setLocalStorageState(localStorageKeys.apartments, newApartments);

        setApartments(newApartments);
    };

    const handleDeleteApartment = id => {
        const newApartments = apartments.filter(apartment => apartment.id !== id);

        // Persist apartments in local storage
        setLocalStorageState(localStorageKeys.apartments, newApartments);

        setApartments(newApartments);
    };

    const handleChangeOrder = e => {
        const { value } = e.target;

        setOrder(value);
    };

    const handleChangeSortProperty = e => {
        const { value } = e.target;

        setSortProperty(value);
    };

    // Sort apartments by any property in descending order. Disclude address, link, and imageLink.
    const handleSortApartments = () => {
        const newApartments = [...apartments];
        const sortedApartments = newApartments.sort((a, b) => 
            order === 'asc' ? a[sortProperty] - b[sortProperty] : b[sortProperty] - a[sortProperty]);

        setApartments(sortedApartments);
    };

    const renderApartmentList = apartments.length > 0 && (
        <ApartmentList 
            apartments={apartments} 
            handleDeleteApartment={handleDeleteApartment}
            handleUpdateApartment={handleUpdateApartment}
        />
    );
    
    // update sort
    useEffect(() => {
        handleSortApartments(sortProperty);
    }, [sortProperty, order]);

    return (
        <ApartmentContainer $variant={cardProps.variant.background} $p={portfolioContainerPadding}>
            <Box>
                <ApartmentButtonHeaderContainer>
                    <FlexBox>
                        <Select onChange={handleChangeSortProperty} value={sortProperty}>
                            <Option value="price">Price</Option>
                            <Option value="bedrooms">Bedrooms</Option>
                            <Option value="bathrooms">Bathrooms</Option>
                            <Option value="walkScore">Walk Score</Option>
                            <Option value="locationScore">Location Score</Option>
                            <Option value="amenityScore">Amenity Score</Option>
                            <Option value="interiorScore">Interior Score</Option>
                            <Option value="totalScore">Total Score</Option>
                        </Select>

                        <Select onChange={handleChangeOrder} value={order}>
                            <Option value="asc">Ascending</Option>
                            <Option value="desc">Descending</Option>
                        </Select>
                    </FlexBox>

                    <Modal
                        showModal={showModal}
                        variant={modalProps.variant.background}
                        modalComponent={() =>
                            <Form
                                formParams={addApartmentForm}
                                handleSubmit={handleAddApartment}
                            />
                        }
                        handleToggleModal={toggleModal}
                        center
                    >
                        {buttonNames.add}
                    </Modal>
                </ApartmentButtonHeaderContainer>
            </Box>

            {renderApartmentList}
        </ApartmentContainer>
    );
};

export default Apartment;