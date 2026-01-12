import React, { useEffect } from 'react';
import { NotificationContainer } from './notificationStyledComponents';
import { FlexBox, TextSmall } from 'components/styled';

function Notification({message, variant, handleHideNotifiction, notificationLength}) {
    useEffect(() => {
        const timeoutMs = notificationLength || 10000;
        const successTimeout = setTimeout(() => {
            handleHideNotifiction();
        }, timeoutMs);

        return () => {
            clearTimeout(successTimeout);
        };
    }, []);

    return (
        <NotificationContainer $variant={variant} $m={[4]} $p={[4]}>
            <FlexBox $center>
                <TextSmall>{message}</TextSmall>
            </FlexBox>
        </NotificationContainer>
    );
};

export default Notification;
