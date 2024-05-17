import { useState } from 'react';
import { localStorageKeys, orders } from 'utils/consts';
import { getStateFromLocalStorage, setLocalStorageState } from 'utils/helpers';
import { buildNewApartment } from './useApartmentsUtils';
import { checkScoreCategory } from 'utils/reactUtils';

function useApartments() {
    const [apartments, setApartments] = useState(() => getStateFromLocalStorage(localStorageKeys.apartments));

    const handleAddApartment = (apartment, settings) => {
        const newApartment = buildNewApartment(apartment, settings);
        const newApartments = [newApartment, ...apartments];

        // Persist apartments in local storage
        setLocalStorageState(localStorageKeys.apartments, newApartments);

        setApartments(newApartments);
    };

    const handleUpdateApartment = (id, apartment, settings) => {
        const newApartments = apartments.map(prevApartment =>
            prevApartment.id === id ? buildNewApartment(apartment, settings) : prevApartment
        );

        // Persist apartments in local storage
        setLocalStorageState(localStorageKeys.apartments, newApartments);

        setApartments(newApartments);
    };

    const handleUpdateAllApartments = settings => {
        const newApartments = apartments.map(prevApartment => 
            buildNewApartment(prevApartment, settings)
        );
        
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

    const handleSortApartments = (category, order) => {
        const newApartments = [...apartments];
        const sortedApartments = newApartments.sort((apartmentA, apartmentB) => {
            let apartmentAValue = apartmentA[category];
            let apartmentBValue = apartmentB[category];
            const isScoreCategory = checkScoreCategory(category);
            const isAscOrder = order === orders.asc;
            
            // If score category is selected, sort by weighted score
            if(isScoreCategory) {
                apartmentAValue = apartmentAValue.weightedScore;
                apartmentBValue = apartmentBValue.weightedScore;
            };

            return isAscOrder ? apartmentAValue - apartmentBValue : apartmentBValue - apartmentAValue;
        });

        setApartments(sortedApartments);
    };

    return {
        apartments,
        handleAddApartment,
        handleUpdateApartment,
        handleUpdateAllApartments,
        handleDeleteApartment,
        handleSortApartments
    };
};

export default useApartments;