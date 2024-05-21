import React from 'react';
import ApartmentListItem from './components/apartmentListItem';
import { FlexBoxColumn, Grid } from '../styled';
import { useMediaQuery } from '../../hooks';

function ApartmentList({apartments, handleDeleteApartment, handleUpdateApartment}) {
    const { isDesktop } = useMediaQuery();
    const apartmentListMargin = isDesktop ? [0, 8] : null;
    const apartmentListItemSize = isDesktop ? 87 : 87;

    const renderApartments = apartments.map((apartment, i) => {
        return (
            <ApartmentListItem 
                key={i} 
                apartment={apartment} 
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

export default ApartmentList;