import React from 'react';
import ApartmentListItem from './apartmentListItem';
import { Box, FlexBoxColumn, Grid } from '../styled';
import { apartmentListHeading } from './apartmentListConsts';
import { useMediaQuery } from '../../hooks';
import { Heading, headingProps } from '../common';

function ApartmentList({apartments, handleDeleteApartment, handleUpdateApartment}) {
    const { isDesktop } = useMediaQuery();
    const headingMargin = isDesktop ? [0, 8] : [0, 5];
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
            <Box $m={headingMargin}>
                <Heading 
                    variant={headingProps.variant.success} 
                    heading={apartmentListHeading} 
                />
            </Box>

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