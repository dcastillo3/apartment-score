import { useState, useContext } from 'react';
import { orders, apis, initialStates } from 'utils/consts';
import { buildNewApartment } from './useApartmentsUtils';
import { checkScoreCategory } from 'utils/reactUtils';
import { errorPrefixes } from './useApartmentsConsts';
import { AuthContext } from 'context';
import axios from 'axios';

function useApartments() {
    const { isAuthenticated } = useContext(AuthContext);
    const [apartments, setApartments] = useState(initialStates.apartments);

    // Persist apartments to MongoDB
    const persistApartments = async (newApartments) => {
        if (isAuthenticated) {
            try {
                const axiosConfig = { withCredentials: true };
                const apartmentsPayload = { apartments: newApartments };

                await axios.put(apis.user.data, apartmentsPayload, axiosConfig);
            } catch (err) {
                console.error(errorPrefixes.saveFailed, err);
            }
        }
    };

    const handleAddApartment = async (apartment, scoreSettings) => {
        const newApartment = buildNewApartment(apartment, scoreSettings);
        const newApartments = [newApartment, ...apartments];

        setApartments(newApartments);

        await persistApartments(newApartments);
    };

    const handleUpdateApartment = async (id, apartment, scoreSettings) => {
        const newApartments = apartments.map(prevApartment =>
            prevApartment.id === id ? buildNewApartment(apartment, scoreSettings) : prevApartment
        );

        setApartments(newApartments);

        await persistApartments(newApartments);
    };

    const handleUpdateAllApartments = async (scoreSettings) => {
        const newApartments = apartments.map(prevApartment => 
            buildNewApartment(prevApartment, scoreSettings)
        );
        
        setApartments(newApartments);

        await persistApartments(newApartments);
    };

    const handleDeleteApartment = async (id) => {
        const newApartments = apartments.filter(apartment => apartment.id !== id);

        setApartments(newApartments);

        await persistApartments(newApartments);
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

    const handleImportApartments = async (importedApartments) => {
        setApartments(importedApartments);

        await persistApartments(importedApartments);
    };

    const fetchApartments = async () => {
        if (!isAuthenticated) return;
        
        try {
            const axiosConfig = { withCredentials: true };
            const res = await axios.get(apis.user.data, axiosConfig);

            if (res?.data?.success) {
                const { apartments = [] } = res.data.data;

                setApartments(apartments);
            }
        } catch (err) {
            console.error(errorPrefixes.fetchFailed, err);
        }
    };

    return {
        apartments,
        setApartments,
        handleAddApartment,
        handleUpdateApartment,
        handleUpdateAllApartments,
        handleDeleteApartment,
        handleSortApartments,
        handleImportApartments,
        fetchApartments
    };
};

export default useApartments;