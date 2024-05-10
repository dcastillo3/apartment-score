import React, { useState } from 'react';
import { Box, cardProps } from '../../styled';
import { useMediaQuery } from '../../../hooks';
import { ApartmentContainer, ApartmentModalContainer } from './apartmentStyledComponents';
import { localStorageKeys } from '../../../utils/consts';
import { generateUniqueId } from '../../../utils/reactUtils';
import { ApartmentList } from '../../apartmentList';
import { addApartmentForm } from './apartmentForms';
import { Form, Modal, modalProps } from '../../common';
import { buttonNames } from './apartmentConsts';
import { getTotalScore } from '../../apartmentList/apartmentListUtils';
import { getStateFromLocalStorage, setLocalStorageState } from '../../../utils/helpers';

function Apartment() {
    const [apartments, setApartments] = useState(() => getStateFromLocalStorage(localStorageKeys.apartments));
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

        setApartments(newApartments);
    };

    const renderApartmentList = apartments.length > 0 && (
        <ApartmentList 
            apartments={apartments} 
            handleDeleteApartment={handleDeleteApartment}
            handleUpdateApartment={handleUpdateApartment}
        />
    );

    return (
        <ApartmentContainer $variant={cardProps.variant.background} $p={portfolioContainerPadding}>
            <Box>
                <ApartmentModalContainer>
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
                </ApartmentModalContainer>
            </Box>

            {renderApartmentList}
        </ApartmentContainer>
    );
};

export default Apartment;