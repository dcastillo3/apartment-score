import React, { createRef, forwardRef } from 'react';
import ApartmentListItem from './components/apartmentListItem';
import { FlexBoxColumn, Grid } from '../styled';
import { useMediaQuery } from '../../hooks';
import { createApartmentRefs } from './apartmentListUtils';

function ApartmentList({
    apartments,
    highlightId,
    handleDeleteApartment,
    handleUpdateApartment
}, ref) {
    const { isDesktop } = useMediaQuery();
    const apartmentListMargin = isDesktop ? [0, 8] : null;
    const apartmentListItemSize = isDesktop ? 87 : 87;
    
    // Create refs for each apartment
    createApartmentRefs(apartments, ref, createRef);

    const renderApartments = apartments.map((apartment, i) => {
        const highlightedApartment = highlightId === apartment.id;

        return (
            <ApartmentListItem 
                key={i}
                apartmentRef={ref.current[apartment.id]}
                apartment={apartment}
                highlighted={highlightedApartment} 
                handleDelete={handleDeleteApartment} 
                handleUpdate={handleUpdateApartment}
            />
        );
    });

    return (
        <FlexBoxColumn>
            <Grid 
                $m={apartmentListMargin} 
                $center={true} 
                $itemSize={apartmentListItemSize}
            >
                {renderApartments}
            </Grid>
        </FlexBoxColumn>
    );
};

// Forward ref to parent component
export default forwardRef(ApartmentList);