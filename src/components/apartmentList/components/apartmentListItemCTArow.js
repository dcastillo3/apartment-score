import React from 'react';
import { Button, FlexBox, buttonProps } from '../../styled';
import { buttonNames } from '../../main/apartment/apartmentConsts';

function ApartmentListItemCTARow({isDesktop, handleToggleUpdateClick, handleDeleteClick}) {
    const buttonSize = isDesktop ? buttonProps.size.medium : buttonProps.size.small;
    
    return (
        <FlexBox $itemsPerRow={2}>
            <Button $size={buttonSize} $m={[2]} onClick={handleToggleUpdateClick}>{buttonNames.update}</Button>

            <Button $size={buttonSize} $m={[2]} onClick={handleDeleteClick}>{buttonNames.delete}</Button>
        </FlexBox>

    );
};

export default ApartmentListItemCTARow;