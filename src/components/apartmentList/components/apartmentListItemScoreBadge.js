import React from 'react';
import { Card, SubTitle, cardProps } from '../../styled';

function ApartmentListItemScoreBadge({totalScore}) {
    return (
        <Card $variant={cardProps.variant.success} $m={[2, 0, 0, 0]} $p={[1, 2]}>
            <SubTitle>{totalScore}</SubTitle>
        </Card>
    );
};

export default ApartmentListItemScoreBadge;