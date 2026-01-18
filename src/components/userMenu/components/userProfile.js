import React from 'react';
import { FlexBox, Button, Span, buttonProps } from '../../styled';
import { labels } from '../userMenuConsts';

function UserProfile({ user, logout }) {
    const displayName = user.userName || user.firstName || user.email;

    return (
        <FlexBox>
            <Span>{displayName}</Span>
            <Button 
                onClick={logout}
                $variant={buttonProps.variant.secondary}
                $size={buttonProps.size.small}
            >
                {labels.logoutButton}
            </Button>
        </FlexBox>
    );
}

export default UserProfile;
