import React from 'react';
import { Anchor, TitleSmall } from '../../styled';
import { baseMapsUrl } from '../apartmentListConsts';

function ApartmentListItemMapsLink({ address }) {
    const encodedAddress = encodeURI(address);
    const mapsUrl = `${baseMapsUrl}${encodedAddress}`;

    return (
        <Anchor href={mapsUrl} target="_blank">
            <TitleSmall>{address}</TitleSmall>
        </Anchor>
    );
};

export default ApartmentListItemMapsLink;